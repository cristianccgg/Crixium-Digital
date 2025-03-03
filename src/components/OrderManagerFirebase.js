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
  // Improve type detection for music-related services
  const isMusicService =
    type === "music" ||
    type === "jingle" ||
    type === "locucion" ||
    (typeof type === "object" && type.category === "jingle") ||
    (typeof type === "object" && type.category === "locucion") ||
    (typeof type === "object" && type.type === "music");

  const prefix = isMusicService ? "MUSIC" : "WEB";

  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
};

export const createOrder = async (formData) => {
  try {
    // Better determination of order type - check for music-related types first
    let orderType;

    // Check if it's a music-related service
    if (
      formData.packageDetails?.type === "music" ||
      formData.packageDetails?.category === "jingle" ||
      formData.packageDetails?.category === "locucion"
    ) {
      orderType = "music";
    }
    // If not music, determine between web or ecommerce
    else {
      orderType = formData.projectType === "ecommerce" ? "ecommerce" : "web";
    }

    // Generate order number based on the determined type
    const orderNumber = generateOrderNumber(orderType);

    // Create basic structure of steps for tracking based on order type
    let steps;

    if (orderType === "music") {
      // Pasos específicos para servicios de audio (jingles/voiceovers)
      steps = [
        {
          name: "Pedido Recibido",
          completed: true,
          date: new Date().toLocaleDateString(),
        },
        { name: "Composición", completed: false },
        { name: "Producción", completed: false },
        { name: "Grabación", completed: false },
        { name: "Revisión", completed: false },
        { name: "Finalizado", completed: false },
      ];
    } else {
      // Pasos para proyectos web
      steps = [
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
    }

    // Upload reference files if they exist
    const referenceFileUrls = [];
    const referenceFileNames = [];

    if (formData.referenceFiles && formData.referenceFiles.length > 0) {
      for (const file of formData.referenceFiles) {
        // Create a reference in Firebase Storage
        const fileRef = ref(
          storage,
          `orders/${orderNumber}/references/${file.name}`
        );

        // Upload file
        await uploadBytes(fileRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(fileRef);

        // Save URL and filename
        referenceFileUrls.push(downloadURL);
        referenceFileNames.push(file.name);
      }
    }

    // Handle product files for ecommerce if they exist
    const productFileUrls = [];
    const productFileNames = [];

    if (formData.productFiles && formData.productFiles.length > 0) {
      for (const file of formData.productFiles) {
        // Create a reference in Firebase Storage
        const fileRef = ref(
          storage,
          `orders/${orderNumber}/products/${file.name}`
        );

        // Upload file
        await uploadBytes(fileRef, file);

        // Get download URL
        const downloadURL = await getDownloadURL(fileRef);

        // Save URL and filename
        productFileUrls.push(downloadURL);
        productFileNames.push(file.name);
      }
    }

    // Create details object adapted to project type
    let details = {
      package: formData.packageDetails,
      extras: formData.extras || [],
      designReference: formData.designReference || "",
      referenceFileNames,
      referenceFileUrls,
    };

    // Add fields specific to project type
    if (orderType === "music") {
      // Special handling for music orders
      details = {
        ...details,
        voiceType: formData.voiceType || "",
        reference: formData.reference || "",
        briefing: formData.briefing || formData.script || "", // Support both field names
        tone: formData.tone || "",
        voiceAge: formData.voiceAge || "",
        language: formData.language || "",
      };
    } else if (orderType === "web") {
      console.log("Processing web project with features:", formData.features);

      details = {
        ...details,
        siteType: formData.siteType || "",
        projectDescription: formData.projectDescription || "",
        framework: formData.framework || "",
        features: Array.isArray(formData.features)
          ? [...formData.features]
          : [],
      };
    } else if (orderType === "ecommerce") {
      details = {
        ...details,
        businessName: formData.businessName || "",
        businessType: formData.businessType || "",
        productCount: formData.productCount || "",
        domain: formData.domain || "",
        hasLogo: formData.hasLogo || "no",
        hasContent: formData.hasContent || "no",
        hasProducts: formData.hasProducts || "no",
        storeDescription: formData.storeDescription || "",
        productFileNames,
        productFileUrls,
      };
      console.log("Features after processing:", details.features);
    }

    // Create complete order object
    const newOrder = {
      orderNumber,
      type: orderType,
      title: formData.packageDetails?.title || "Proyecto Personalizado",
      client: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      status: "received", // Possible statuses: received, in-progress, review, completed
      currentStep: 0,
      steps,
      details,
      comments: [],
      total: formData.total || 0,
      serviceType: formData.serviceType || "wordpress", // service type (wordpress, custom, shopify)
      projectType: formData.projectType || "website", // project type (website, ecommerce)
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    // Save to Firestore
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

// Function to find an order by number
export const getOrderByNumber = async (orderNumber) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("orderNumber", "==", orderNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Return the first matching document
    const orderDoc = querySnapshot.docs[0];
    return { firebaseId: orderDoc.id, ...orderDoc.data() };
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

// Function to manually update an order's status
export const updateOrderStatus = async (
  orderNumber,
  newStatus,
  currentStepIndex = null
) => {
  try {
    // First find the order
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Prepare data to update
    const updateData = {
      status: newStatus,
      lastUpdate: serverTimestamp(),
    };

    // If a step index is provided, update completed steps
    if (
      currentStepIndex !== null &&
      currentStepIndex >= 0 &&
      currentStepIndex < order.steps.length
    ) {
      // Create a copy of the steps
      const updatedSteps = [...order.steps];

      // Mark current and previous steps as completed
      for (let i = 0; i <= currentStepIndex; i++) {
        updatedSteps[i].completed = true;
        if (i === currentStepIndex) {
          updatedSteps[i].date = new Date().toLocaleDateString();
        }
      }

      // If there's a next step, mark it as the current stage
      if (currentStepIndex + 1 < updatedSteps.length) {
        updatedSteps[currentStepIndex + 1].currentStage = true;
        // Clear any other stage marked as "currentStage"
        for (let i = 0; i < updatedSteps.length; i++) {
          if (i !== currentStepIndex + 1) {
            updatedSteps[i].currentStage = false;
          }
        }
      }

      updateData.steps = updatedSteps;
      updateData.currentStep = currentStepIndex;
    }

    // Use the correct Firestore document ID
    const orderDocRef = doc(db, "orders", order.firebaseId);
    await updateDoc(orderDocRef, updateData);

    // Get the updated document
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

// Function to add a comment or delivery to an order
export const addOrderComment = async (
  orderNumber,
  comment,
  isDelivery = false,
  deliveryFile = null,
  fromClient = false,
  attachmentNames = []
) => {
  try {
    // First find the order
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Prepare the new comment object
    const newComment = {
      id: uuidv4(),
      text: comment,
      isDelivery,
      fromClient,
      attachmentNames,
      createdAt: new Date().toISOString(),
    };

    // If there are delivery files to upload
    if (isDelivery && deliveryFile) {
      // Create a reference in Firebase Storage
      const fileRef = ref(
        storage,
        `orders/${orderNumber}/deliveries/${deliveryFile.name}`
      );

      // Upload the file
      await uploadBytes(fileRef, deliveryFile);

      // Get download URL
      const downloadURL = await getDownloadURL(fileRef);

      // Add URL to the comment
      newComment.deliveryFileUrl = downloadURL;
      newComment.deliveryFileName = deliveryFile.name;
    }

    // Prepare data to update
    let newStatus = order.status;

    // If it's a delivery, update status to "review"
    if (isDelivery) {
      newStatus = "review";
    }

    if (fromClient && order.status === "completed") {
      newStatus = "review";
    }

    // Use the correct Firestore document ID
    const orderDocRef = doc(db, "orders", order.firebaseId);

    // Make sure order.comments is an array before updating
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

// Function to get all orders (useful for creating an admin panel)
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

// Function to export all orders to a JSON file
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

// Function to import orders from a JSON file
export const importOrdersFromJson = async (jsonData) => {
  try {
    const parsedData = JSON.parse(jsonData);

    if (parsedData && parsedData.orders) {
      const ordersRef = collection(db, "orders");
      const batch = [];

      // Use batches to import multiple documents
      for (const order of parsedData.orders) {
        // Make sure dates are Firestore timestamps
        const orderWithTimestamps = {
          ...order,
          createdAt: serverTimestamp(),
          lastUpdate: serverTimestamp(),
        };

        // Remove ID fields if they exist to avoid conflicts
        if (orderWithTimestamps.firebaseId) {
          delete orderWithTimestamps.firebaseId;
        }
        if (orderWithTimestamps.id) {
          delete orderWithTimestamps.id;
        }

        batch.push(addDoc(ordersRef, orderWithTimestamps));
      }

      // Execute all promises
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

// Function to upload files to an order
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
      // Create a reference in Firebase Storage
      const fileRef = ref(
        storage,
        `orders/${orderNumber}/${type}/${file.name}`
      );

      // Create promise to upload the file
      uploadPromises.push(
        uploadBytes(fileRef, file).then(() => getDownloadURL(fileRef))
      );

      fileNames.push(file.name);
    }

    // Execute all upload promises and get URLs
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
