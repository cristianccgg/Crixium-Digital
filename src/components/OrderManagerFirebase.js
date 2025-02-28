import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export const generateOrderNumber = (type) => {
  // Asegurarnos de que el tipo sea el correcto
  const prefix =
    type.toLowerCase() === "music" ||
    type.toLowerCase().includes("jingle") ||
    type.toLowerCase().includes("locucion")
      ? "MUSIC"
      : "WEB";

  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
};

// Función para crear un nuevo pedido basado en el formulario de checkout
export const createOrder = async (formData) => {
  try {
    // Mejorar la determinación del tipo de pedido
    const orderType =
      formData.packageDetails?.category === "music" ||
      formData.packageDetails?.category === "jingle" ||
      formData.packageDetails?.category === "locucion" ||
      formData.packageDetails?.title?.toLowerCase().includes("jingle") ||
      formData.packageDetails?.title?.toLowerCase().includes("locucion") ||
      formData.packageDetails?.type === "music"
        ? "music"
        : "web";

    // Generar un número de pedido único
    const orderNumber = generateOrderNumber(orderType);

    // Crear estructura básica de pasos para el seguimiento
    const steps =
      orderType === "music"
        ? [
            {
              name: "Pedido Recibido",
              completed: true,
              date: new Date().toLocaleDateString(),
            },
            { name: "Concepto", completed: false },
            { name: "Producción", completed: false },
            { name: "Revisión", completed: false },
            { name: "Finalizado", completed: false },
          ]
        : [
            {
              name: "Pedido Recibido",
              completed: true,
              date: new Date().toLocaleDateString(),
            },
            { name: "Diseño", completed: false },
            { name: "Desarrollo", completed: false },
            { name: "Revisión", completed: false },
            { name: "Finalizado", completed: false },
          ];

    // Subir archivos de referencia si existen
    const referenceFileUrls = [];
    const referenceFileNames = [];

    if (formData.referenceFiles && formData.referenceFiles.length > 0) {
      for (const file of formData.referenceFiles) {
        // Crear una referencia en Firebase Storage
        const fileRef = ref(
          storage,
          `orders/${orderNumber}/references/${file.name}`
        );

        // Subir el archivo
        await uploadBytes(fileRef, file);

        // Obtener la URL de descarga
        const downloadURL = await getDownloadURL(fileRef);

        // Guardar la URL y el nombre del archivo
        referenceFileUrls.push(downloadURL);
        referenceFileNames.push(file.name);
      }
    }

    // Crear el objeto de pedido
    const newOrder = {
      orderNumber,
      type: orderType,
      title: formData.packageDetails?.title || "Proyecto Personalizado",
      client: formData.name,
      email: formData.email,
      status: "received", // Estados posibles: received, in-progress, review, completed
      currentStep: 0,
      steps,
      details: {
        package: formData.packageDetails,
        extras: formData.extras,
        siteType: formData.siteType || "",
        designReference: formData.designReference || "",
        projectDescription: formData.projectDescription || "",
        framework: formData.framework || "",
        features: formData.features || [],
        referenceFileNames,
        referenceFileUrls,
      },
      comments: [],
      total: formData.total || 0,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    // Guardar en Firestore
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, newOrder);

    return {
      success: true,
      orderNumber,
      order: { ...newOrder, firebaseId: docRef.id },
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message: `Error al crear el pedido: ${error.message}`,
    };
  }
};

// Función para buscar un pedido por número
export const getOrderByNumber = async (orderNumber) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("orderNumber", "==", orderNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Devolver el primer documento que coincide
    const orderDoc = querySnapshot.docs[0];
    return { firebaseId: orderDoc.id, ...orderDoc.data() };
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

// Función para actualizar manualmente el estado de un pedido
export const updateOrderStatus = async (
  orderNumber,
  newStatus,
  currentStepIndex = null
) => {
  try {
    // Primero buscar el pedido
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Preparar los datos para actualizar
    const updateData = {
      status: newStatus,
      lastUpdate: serverTimestamp(),
    };

    // Si se proporciona un índice de paso, actualizar los pasos completados
    if (
      currentStepIndex !== null &&
      currentStepIndex >= 0 &&
      currentStepIndex < order.steps.length
    ) {
      // Crear una copia de los pasos
      const updatedSteps = [...order.steps];

      // Marcar el paso actual y anteriores como completados
      for (let i = 0; i <= currentStepIndex; i++) {
        updatedSteps[i].completed = true;
        if (i === currentStepIndex) {
          updatedSteps[i].date = new Date().toLocaleDateString();
        }
      }

      // Si hay un paso siguiente, marcarlo como el paso actual
      if (currentStepIndex + 1 < updatedSteps.length) {
        updatedSteps[currentStepIndex + 1].currentStage = true;
        // Limpiar cualquier otra etapa marcada como "currentStage"
        for (let i = 0; i < updatedSteps.length; i++) {
          if (i !== currentStepIndex + 1) {
            updatedSteps[i].currentStage = false;
          }
        }
      }

      updateData.steps = updatedSteps;
      updateData.currentStep = currentStepIndex;
    }

    // CAMBIO IMPORTANTE: Usamos el ID correcto del documento de Firestore
    const orderDocRef = doc(db, "orders", order.firebaseId);
    await updateDoc(orderDocRef, updateData);

    // Obtener el documento actualizado
    const updatedOrderDoc = await getDoc(orderDocRef);
    const updatedOrder = {
      firebaseId: updatedOrderDoc.id,
      ...updatedOrderDoc.data(),
    };

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      message: `Error al actualizar el estado: ${error.message}`,
    };
  }
};

// Función para agregar un comentario o entrega a un pedido
export const addOrderComment = async (
  orderNumber,
  comment,
  isDelivery = false,
  deliveryFile = null,
  fromClient = false,
  attachmentNames = []
) => {
  try {
    // Primero buscar el pedido
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Preparar el objeto de nuevo comentario
    const newComment = {
      id: uuidv4(),
      text: comment,
      isDelivery,
      fromClient,
      attachmentNames,
      createdAt: new Date().toISOString(),
    };

    // Si hay archivos de entrega que subir
    if (isDelivery && deliveryFile) {
      // Crear una referencia en Firebase Storage
      const fileRef = ref(
        storage,
        `orders/${orderNumber}/deliveries/${deliveryFile.name}`
      );

      // Subir el archivo
      await uploadBytes(fileRef, deliveryFile);

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(fileRef);

      // Añadir la URL al comentario
      newComment.deliveryFileUrl = downloadURL;
      newComment.deliveryFileName = deliveryFile.name;
    }

    // Preparar los datos para actualizar
    let newStatus = order.status;

    // Si es una entrega, actualizar estado a "review"
    if (isDelivery) {
      newStatus = "review";
    }

    // Si es un comentario del cliente y el pedido está en estado "completed"
    // volver a ponerlo en "review" para indicar que requiere atención
    if (fromClient && order.status === "completed") {
      newStatus = "review";
    }

    // CAMBIO IMPORTANTE: Usamos el ID correcto del documento de Firestore
    const orderDocRef = doc(db, "orders", order.firebaseId);

    // Asegurarse de que order.comments sea un array antes de actualizarlo
    const comments = Array.isArray(order.comments)
      ? [...order.comments, newComment]
      : [newComment];

    await updateDoc(orderDocRef, {
      comments: comments,
      status: newStatus,
      lastUpdate: serverTimestamp(),
    });

    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      message: `Error al agregar comentario: ${error.message}`,
    };
  }
};

// Función para obtener todos los pedidos (útil para crear un panel de administración)
export const getAllOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ firebaseId: doc.id, ...doc.data() });
    });

    return orders;
  } catch (error) {
    console.error("Error getting all orders:", error);
    return [];
  }
};

// Función para exportar todos los pedidos a un archivo JSON
export const exportOrdersToJson = async () => {
  try {
    const orders = await getAllOrders();
    const dataStr = JSON.stringify({ orders }, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `orders-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    return { success: true };
  } catch (error) {
    console.error("Error exporting orders:", error);
    return {
      success: false,
      message: `Error al exportar pedidos: ${error.message}`,
    };
  }
};

// Función para importar pedidos desde un archivo JSON
export const importOrdersFromJson = async (jsonData) => {
  try {
    const parsedData = JSON.parse(jsonData);

    if (parsedData && parsedData.orders) {
      const ordersRef = collection(db, "orders");
      const batch = [];

      // Usar batches para importar múltiples documentos
      for (const order of parsedData.orders) {
        // Asegurarse de que las fechas sean timestamps de Firestore
        const orderWithTimestamps = {
          ...order,
          createdAt: serverTimestamp(),
          lastUpdate: serverTimestamp(),
        };

        // Eliminar los campos de ID si existen para evitar conflictos
        if (orderWithTimestamps.firebaseId) {
          delete orderWithTimestamps.firebaseId;
        }
        if (orderWithTimestamps.id) {
          delete orderWithTimestamps.id;
        }

        batch.push(addDoc(ordersRef, orderWithTimestamps));
      }

      // Ejecutar todas las promesas
      await Promise.all(batch);

      return {
        success: true,
        message: `${parsedData.orders.length} pedidos importados correctamente`,
      };
    } else {
      return { success: false, message: "Formato de archivo inválido" };
    }
  } catch (error) {
    console.error("Error importing orders:", error);
    return {
      success: false,
      message: `Error al importar: ${error.message}`,
    };
  }
};

// Función para subir archivos al pedido
export const uploadOrderFiles = async (
  orderNumber,
  files,
  type = "references"
) => {
  try {
    if (!files || files.length === 0)
      return { success: true, urls: [], fileNames: [] };

    const uploadPromises = [];
    const fileNames = [];

    for (const file of files) {
      // Crear una referencia en Firebase Storage
      const fileRef = ref(
        storage,
        `orders/${orderNumber}/${type}/${file.name}`
      );

      // Crear promesa para subir el archivo
      uploadPromises.push(
        uploadBytes(fileRef, file).then(() => getDownloadURL(fileRef))
      );

      fileNames.push(file.name);
    }

    // Ejecutar todas las promesas de carga y obtener URLs
    const urls = await Promise.all(uploadPromises);

    return {
      success: true,
      urls,
      fileNames,
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    return {
      success: false,
      message: `Error al subir archivos: ${error.message}`,
    };
  }
};
