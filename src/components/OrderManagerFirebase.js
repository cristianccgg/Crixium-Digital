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
// Importamos el servicio de correo, pero recordamos que está desactivado para ahorrar costos
import {
  sendOrderConfirmationEmail,
  sendOrderStatusEmail,
} from "../services/EmailClient";

/**
 * Genera un número de pedido basado en el tipo
 * @param {string|Object} type - Tipo de pedido
 * @returns {string} - Número de pedido generado
 */
export const generateOrderNumber = (type) => {
  // Improve type detection for music-related services
  const isMusicService =
    type === "music" ||
    type === "jingle" ||
    type === "locucion" ||
    (typeof type === "object" && type.category === "jingle") ||
    (typeof type === "object" && type.category === "locucion") ||
    (typeof type === "object" && type.type === "music");

  // Para pedidos web/ecommerce ahora usaremos un prefijo diferente
  const isInquiry =
    type === "inquiry" ||
    (typeof type === "object" && type.paymentStatus === "inquiry");

  let prefix;
  if (isMusicService) {
    prefix = "MUSIC";
  } else if (isInquiry) {
    prefix = "INQ"; // Para solicitudes de información (no pagos)
  } else {
    prefix = "WEB"; // Para pedidos web normales
  }

  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
};

/**
 * Crea un nuevo pedido en Firestore
 * @param {Object} formData - Datos del formulario de pedido
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const createOrder = async (formData) => {
  try {
    // Determinar tipo de pedido: música o solicitud web
    let orderType;
    let isWebInquiry = false;

    // Verificar si es un servicio de música
    if (
      formData.packageDetails?.type === "music" ||
      formData.packageDetails?.category === "jingle" ||
      formData.packageDetails?.category === "locucion"
    ) {
      orderType = "music";
    } else {
      // Si el estado de pago es 'inquiry', es una solicitud web sin pago inmediato
      if (formData.paymentStatus === "inquiry") {
        orderType =
          formData.projectType === "ecommerce"
            ? "ecommerce-inquiry"
            : "web-inquiry";
        isWebInquiry = true;
      } else {
        orderType = formData.projectType === "ecommerce" ? "ecommerce" : "web";
      }
    }

    // Generar número de pedido según el tipo
    const orderNumber = generateOrderNumber(orderType);

    // Crear estructura básica de pasos para seguimiento según el tipo de pedido
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
    } else if (isWebInquiry) {
      // Pasos para solicitudes web (sin pago inmediato)
      steps = [
        {
          name: "Solicitud Recibida",
          completed: true,
          date: new Date().toLocaleDateString(),
        },
        { name: "Contacto Inicial", completed: false },
        { name: "Propuesta", completed: false },
        { name: "Contratación", completed: false },
        { name: "Desarrollo", completed: false },
        { name: "Finalizado", completed: false },
      ];
    } else {
      // Pasos para proyectos web con pago
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

        // Subir archivo
        await uploadBytes(fileRef, file);

        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(fileRef);

        // Guardar URL y nombre de archivo
        referenceFileUrls.push(downloadURL);
        referenceFileNames.push(file.name);
      }
    }

    // Manejar archivos de productos para ecommerce si existen
    const productFileUrls = [];
    const productFileNames = [];

    if (formData.productFiles && formData.productFiles.length > 0) {
      for (const file of formData.productFiles) {
        // Crear una referencia en Firebase Storage
        const fileRef = ref(
          storage,
          `orders/${orderNumber}/products/${file.name}`
        );

        // Subir archivo
        await uploadBytes(fileRef, file);

        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(fileRef);

        // Guardar URL y nombre de archivo
        productFileUrls.push(downloadURL);
        productFileNames.push(file.name);
      }
    }

    // Crear objeto de detalles adaptado al tipo de proyecto
    let details = {
      package: formData.packageDetails,
      extras: formData.extras || [],
      designReference: formData.designReference || "",
      referenceFileNames,
      referenceFileUrls,
    };

    // Añadir campos específicos según el tipo de proyecto
    if (orderType === "music") {
      // Manejo especial para pedidos de música
      details = {
        ...details,
        voiceType: formData.voiceType || "",
        reference: formData.reference || "",
        briefing: formData.briefing || formData.script || "", // Compatible con ambos nombres de campo
        tone: formData.tone || "",
        voiceAge: formData.voiceAge || "",
        language: formData.language || "",
      };
    } else if (orderType.includes("web")) {
      details = {
        ...details,
        siteType: formData.siteType || "",
        projectDescription: formData.projectDescription || "",
        framework: formData.framework || "",
        features: Array.isArray(formData.features)
          ? [...formData.features]
          : [],
      };
    } else if (orderType.includes("ecommerce")) {
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
    }

    // Determinar el estado inicial del pedido según el tipo
    let initialStatus = "received";
    if (isWebInquiry) {
      initialStatus = "inquiry"; // Para solicitudes web sin pago
    }

    // Crear objeto de pedido completo
    const newOrder = {
      orderNumber,
      type: orderType,
      title: formData.packageDetails?.title || "Proyecto Personalizado",
      client: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      status: initialStatus,
      paymentStatus: formData.paymentStatus || "pending", // Nuevo campo para el estado del pago
      currentStep: 0,
      steps,
      details,
      comments: [],
      total: formData.total || 0,
      serviceType: formData.serviceType || "wordpress", // tipo de servicio (wordpress, custom, shopify)
      projectType: formData.projectType || "website", // tipo de proyecto (website, ecommerce)
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
      emailSent: false, // Nuevo campo para rastrear si se ha enviado el correo
    };

    // Guardar en Firestore
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, newOrder);

    // OPTIMIZADO: Solo enviar correo si es un pedido de música con pago aprobado
    // Esto reduce las llamadas a Cloud Functions y ahorra costos
    if (
      !isWebInquiry &&
      orderType === "music" &&
      formData.paymentStatus === "approved"
    ) {
      try {
        // Construir la URL de seguimiento
        const trackingUrl = `${window.location.origin}/tracking?order=${orderNumber}`;

        // Intentar enviar el correo de confirmación
        // Nota: La función sendOrderConfirmationEmail está desactivada en EmailClient.js
        // así que realmente no se enviará, pero mantenemos el código por si se reactiva en el futuro
        const emailResult = await sendOrderConfirmationEmail({
          ...newOrder,
          trackingUrl,
        });

        // Actualizar el documento si el correo se envió correctamente
        if (emailResult.success && !emailResult.simulated) {
          await updateDoc(doc(db, "orders", docRef.id), {
            emailSent: true,
            emailSentDate: new Date().toISOString(),
          });
        }
      } catch (emailError) {
        console.error("Error al enviar correo de confirmación:", emailError);
        // No bloqueamos el flujo principal si falla el envío de correo
      }
    }

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

/**
 * Encuentra un pedido por su número
 * @param {string} orderNumber - Número de pedido
 * @returns {Promise<Object|null>} - Pedido encontrado o null
 */
export const getOrderByNumber = async (orderNumber) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("orderNumber", "==", orderNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Devolver el primer documento coincidente
    const orderDoc = querySnapshot.docs[0];
    return { firebaseId: orderDoc.id, ...orderDoc.data() };
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

/**
 * Actualiza el estado de pago de una orden
 * OPTIMIZADO: Solo se usa para pedidos de música
 * @param {string} orderNumber - El número de orden
 * @param {string} paymentStatus - El estado del pago ('approved', 'rejected', 'pending')
 * @returns {Promise<Object>} - Objeto con el resultado de la operación
 */
export const updateOrderPaymentStatus = async (orderNumber, paymentStatus) => {
  try {
    // Primero encontrar la orden
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Comprobar si la orden ya tiene este estado de pago para evitar actualizaciones innecesarias
    if (order.paymentStatus === paymentStatus) {
      return {
        success: true,
        message: `El estado de pago ya era ${paymentStatus}`,
        order,
      };
    }

    // Preparar los datos a actualizar
    const updateData = {
      paymentStatus: paymentStatus,
      lastUpdate: serverTimestamp(),
    };

    // Si el pago fue aprobado, actualizar también el estado general de la orden
    if (paymentStatus === "approved") {
      updateData.status = "in-progress"; // La orden pasa de 'received' a 'in-progress'

      // Avanzar al siguiente paso si corresponde
      if (order.currentStep === 0) {
        const updatedSteps = [...order.steps];
        updatedSteps[0].completed = true;
        updatedSteps[0].date = new Date().toLocaleDateString();
        updatedSteps[1].currentStage = true;
        updateData.steps = updatedSteps;
        updateData.currentStep = 1;
      }
    }

    // Si el pago fue rechazado, marcar la orden como 'payment_failed'
    if (paymentStatus === "rejected") {
      updateData.status = "payment_failed";
    }

    // IMPORTANTE: Si ya está marcado como "emailSent", mantenemos ese estado
    // para evitar que el trigger de Firebase intente enviar otro correo
    if (order.emailSent) {
      updateData.emailSent = true;
      // También preservamos la fecha de envío si existe
      if (order.emailSentDate) {
        updateData.emailSentDate = order.emailSentDate;
      }
    }

    // Usar el ID correcto del documento de Firestore
    const orderDocRef = doc(db, "orders", order.firebaseId);
    await updateDoc(orderDocRef, updateData);

    // Obtener el documento actualizado
    const updatedOrderDoc = await getDoc(orderDocRef);
    const updatedOrder = {
      firebaseId: updatedOrderDoc.id,
      ...updatedOrderDoc.data(),
    };

    // OPTIMIZADO: Enviar correo de confirmación solo si:
    // 1. Es un pedido de música (no web/inquiry)
    // 2. El pago fue aprobado
    // 3. No se ha enviado un correo previamente
    // Esto reduce significativamente las llamadas a Cloud Functions
    if (
      paymentStatus === "approved" &&
      !order.emailSent &&
      (order.type === "music" ||
        order.type.includes("jingle") ||
        order.type.includes("locucion"))
    ) {
      try {
        // Verificar si se ha enviado un correo en los últimos 10 minutos
        // para evitar duplicados
        let recentEmail = false;
        if (order.emailSentDate) {
          const emailDate = new Date(order.emailSentDate);
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          recentEmail = emailDate > tenMinutesAgo;
        }

        if (!recentEmail) {
          // Construir la URL de seguimiento
          const trackingUrl = `${window.location.origin}/tracking?order=${orderNumber}`;

          // Intentar enviar el correo de confirmación
          // Nota: La función sendOrderConfirmationEmail está desactivada en EmailClient.js
          // así que realmente no se enviará, pero mantenemos el código por si se reactiva
          const emailResult = await sendOrderConfirmationEmail({
            ...updatedOrder,
            trackingUrl,
          });

          // Marcar que el correo fue enviado si fue exitoso y actualizar el documento
          if (
            emailResult.success &&
            !emailResult.simulated &&
            !emailResult.alreadySent
          ) {
            await updateDoc(orderDocRef, {
              emailSent: true,
              emailSentDate: new Date().toISOString(),
            });

            // Actualizar también el objeto updatedOrder para retornarlo
            updatedOrder.emailSent = true;
            updatedOrder.emailSentDate = new Date().toISOString();
          }
        } else {
          console.log(
            "Se detectó un envío reciente de correo, evitando duplicado"
          );
        }
      } catch (emailError) {
        console.error("Error al enviar correo de confirmación:", emailError);
        // No bloqueamos el flujo principal si falla el envío de correo
      }
    }

    return {
      success: true,
      order: updatedOrder,
      message: `Estado de pago actualizado a: ${paymentStatus}`,
    };
  } catch (error) {
    console.error("Error al actualizar el estado de pago:", error);
    return {
      success: false,
      message: `Error al actualizar el estado de pago: ${error.message}`,
    };
  }
};

/**
 * Actualiza manualmente el estado de un pedido
 * @param {string} orderNumber - Número de pedido
 * @param {string} newStatus - Nuevo estado
 * @param {number|null} currentStepIndex - Índice del paso actual
 * @param {boolean} notifyCustomer - Si notificar al cliente
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const updateOrderStatus = async (
  orderNumber,
  newStatus,
  currentStepIndex = null,
  notifyCustomer = true
) => {
  try {
    // First find the order
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    // Comprobar si el estado ya es el mismo para evitar actualizaciones innecesarias
    if (order.status === newStatus && currentStepIndex === order.currentStep) {
      return {
        success: true,
        message: "No se requieren cambios, el estado ya es el mismo",
        order,
      };
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

    // OPTIMIZADO: Solo enviar correo de actualización si:
    // 1. Se solicitó notificar al cliente
    // 2. Hubo cambio real de estado
    // 3. Es un pedido de música (no web inquiry)
    // 4. El cliente tiene un email
    if (
      notifyCustomer &&
      order.status !== newStatus &&
      order.email &&
      (order.type === "music" ||
        order.type.includes("jingle") ||
        order.type.includes("locucion"))
    ) {
      try {
        // Construir la URL de seguimiento
        const trackingUrl = `${window.location.origin}/tracking?order=${orderNumber}`;

        // Mensaje predeterminado según el estado
        let statusMessage = "";
        if (newStatus === "in-progress") {
          statusMessage =
            "¡Buenas noticias! Hemos comenzado a trabajar en tu proyecto.";
        } else if (newStatus === "review") {
          statusMessage =
            "Tu proyecto está listo para revisión. Por favor, revisa los detalles en el seguimiento de tu pedido.";
        } else if (newStatus === "completed") {
          statusMessage =
            "¡Tu proyecto ha sido completado! Gracias por confiar en nosotros.";
        }

        // Intentar enviar correo de actualización
        // Nota: La función sendOrderStatusEmail está desactivada en EmailClient.js
        const emailResult = await sendOrderStatusEmail(
          {
            ...updatedOrder,
            trackingUrl,
          },
          statusMessage
        );

        // Actualizar el registro de envío de correo si fue exitoso y no es simulado
        if (emailResult.success && !emailResult.simulated) {
          await updateDoc(orderDocRef, {
            lastEmailSent: new Date().toISOString(),
            lastEmailType: "status_update",
          });
        }
      } catch (emailError) {
        console.error("Error al enviar correo de actualización:", emailError);
        // No interrumpir el flujo principal si falla el envío de correo
      }
    }

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      message: `Error al actualizar el estado: ${error.message}`,
    };
  }
};

/**
 * Agrega un comentario o entrega a un pedido
 * @param {string} orderNumber - Número de pedido
 * @param {string} comment - Texto del comentario
 * @param {boolean} isDelivery - Si es una entrega
 * @param {File|null} deliveryFile - Archivo de entrega
 * @param {boolean} fromClient - Si el comentario viene del cliente
 * @param {string[]} attachmentNames - Nombres de archivos adjuntos
 * @returns {Promise<Object>} - Resultado de la operación
 */
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

    // OPTIMIZADO: Enviar correo solo si:
    // 1. El comentario es del administrador (no del cliente)
    // 2. Es una entrega o actualización importante
    // 3. Es un pedido de música (no web inquiry)
    // 4. El cliente tiene un email
    if (
      !fromClient &&
      (isDelivery || newStatus === "review" || newStatus === "completed") &&
      order.email &&
      (order.type === "music" ||
        order.type.includes("jingle") ||
        order.type.includes("locucion"))
    ) {
      try {
        // Construir la URL de seguimiento
        const trackingUrl = `${window.location.origin}/tracking?order=${orderNumber}`;

        // Preparar mensaje según el tipo de actualización
        let message = comment;
        if (isDelivery) {
          message =
            "Hemos subido una entrega para tu revisión. Por favor, revisa los detalles en tu panel de seguimiento.";
        }

        // Intentar enviar correo de actualización
        // Nota: La función sendOrderStatusEmail está desactivada en EmailClient.js
        const emailResult = await sendOrderStatusEmail(
          {
            orderNumber,
            client: order.client,
            email: order.email,
            status: newStatus,
            trackingUrl,
          },
          message
        );

        // Actualizar el registro de envío de correo si fue exitoso y no es simulado
        if (emailResult.success && !emailResult.simulated) {
          await updateDoc(orderDocRef, {
            lastEmailSent: new Date().toISOString(),
            lastEmailType: isDelivery ? "delivery" : "comment",
          });
        }
      } catch (emailError) {
        console.error("Error al enviar correo de notificación:", emailError);
        // No interrumpir el flujo principal si falla el envío de correo
      }
    }

    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      message: `Error al agregar comentario: ${error.message}`,
    };
  }
};

/**
 * Envía un correo de notificación al cliente sobre su pedido
 * OPTIMIZADO: Solo usar para pedidos de música
 * @param {string} orderNumber - El número de orden
 * @param {string} subject - Asunto del correo
 * @param {string} message - Mensaje personalizado para incluir en el correo
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const sendOrderNotification = async (orderNumber, subject, message) => {
  try {
    // Obtener la información de la orden
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return { success: false, message: "Pedido no encontrado" };
    }

    if (!order.email) {
      return { success: false, message: "El pedido no tiene email asociado" };
    }

    // OPTIMIZADO: Solo enviar notificaciones para pedidos de música
    if (
      !(
        order.type === "music" ||
        order.type.includes("jingle") ||
        order.type.includes("locucion")
      )
    ) {
      return {
        success: false,
        message:
          "Las notificaciones por correo solo están disponibles para pedidos de música",
      };
    }

    // Construir la URL de seguimiento
    const trackingUrl = `${window.location.origin}/tracking?order=${orderNumber}`;

    // Intentar enviar correo de notificación
    // Nota: La función sendOrderStatusEmail está desactivada en EmailClient.js
    const result = await sendOrderStatusEmail(
      {
        orderNumber,
        client: order.client,
        email: order.email,
        status: order.status,
        trackingUrl,
      },
      message
    );

    // Actualizar el estado de envío de correo en la base de datos si fue exitoso y no es simulado
    if (result.success && !result.simulated) {
      const orderDocRef = doc(db, "orders", order.firebaseId);
      await updateDoc(orderDocRef, {
        lastEmailSent: new Date().toISOString(),
        lastEmailType: "notification",
      });
    }

    return result;
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    return {
      success: false,
      message: `Error al enviar correo: ${error.message}`,
    };
  }
};

/**
 * Obtiene todos los pedidos
 * OPTIMIZADO: Usa paginación para reducir lecturas de Firestore
 * @param {number} limit - Límite de pedidos a recuperar (por defecto: 100)
 * @returns {Promise<Array>} - Lista de pedidos
 */
export const getAllOrders = async (limit = 100) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"), limit(limit));
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

/**
 * Exporta todos los pedidos a un archivo JSON
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const exportOrdersToJson = async () => {
  try {
    const orders = await getAllOrders(1000); // Limitar a 1000 pedidos por exportación
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

/**
 * Importa pedidos desde un archivo JSON
 * @param {string} jsonData - Datos JSON
 * @returns {Promise<Object>} - Resultado de la operación
 */
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

/**
 * Sube archivos a un pedido
 * @param {string} orderNumber - Número de pedido
 * @param {File[]} files - Archivos
 * @param {string} type - Tipo de archivos
 * @returns {Promise<Object>} - Resultado de la operación
 */
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

// Exportar por defecto un objeto con todas las funciones
export default {
  generateOrderNumber,
  createOrder,
  getOrderByNumber,
  updateOrderPaymentStatus,
  updateOrderStatus,
  addOrderComment,
  sendOrderNotification,
  getAllOrders,
  exportOrdersToJson,
  importOrdersFromJson,
  uploadOrderFiles,
};
