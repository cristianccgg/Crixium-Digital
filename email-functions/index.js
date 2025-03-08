// functions/index.js - Con configuración CORS y sintaxis actualizada para Firebase v2

const { onCall } = require("firebase-functions/v2/https");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true }); // Añadir CORS

// IMPORTANTE: Cambiamos la forma de importar para asegurarnos de que las plantillas se cargan correctamente
// Usando path.join para manejar las rutas de forma segura en cualquier entorno
const path = require("path");
const templatesPath = path.join(__dirname, "emailTemplates.js");
const templates = require(templatesPath);
const { orderConfirmationTemplate, orderStatusUpdateTemplate } = templates;

// Para debugging: verificar que las plantillas se han cargado correctamente
console.log(
  "¿Se cargaron las plantillas?",
  typeof orderConfirmationTemplate === "function",
  typeof orderStatusUpdateTemplate === "function"
);

admin.initializeApp();

// Configuración de Zoho Mail
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true para el puerto 465, false para otros puertos
  auth: {
    user: "contact@crixiumdigital.com",
    pass: process.env.ZOHO_APP_PASSWORD, // Usar variables de entorno para seguridad
  },
});

/**
 * Cloud Function para enviar correo de confirmación de pedido
 */
exports.sendOrderConfirmationEmail = onCall(
  {
    maxInstances: 10,
  },
  async (data) => {
    try {
      const { orderData } = data.data;

      if (!orderData || !orderData.email) {
        throw new Error("Datos de pedido incompletos");
      }

      // Verificar si ya se ha enviado un correo de confirmación para este pedido
      if (orderData.orderNumber) {
        const ordersRef = admin.firestore().collection("orders");
        const snapshot = await ordersRef
          .where("orderNumber", "==", orderData.orderNumber)
          .get();

        if (!snapshot.empty) {
          const orderDoc = snapshot.docs[0];
          const orderInfo = orderDoc.data();

          // Si ya se envió un correo y no fue hace más de 10 minutos, no enviar otro
          if (orderInfo.emailSent && orderInfo.emailSentDate) {
            const emailSentDate = orderInfo.emailSentDate.toDate
              ? orderInfo.emailSentDate.toDate()
              : new Date(orderInfo.emailSentDate);
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

            if (emailSentDate > tenMinutesAgo) {
              console.log(
                `Correo ya enviado recientemente para el pedido ${orderData.orderNumber}, omitiendo envío duplicado`
              );
              return {
                success: true,
                message:
                  "Correo ya enviado recientemente, omitiendo envío duplicado",
                alreadySent: true,
              };
            }
          }
        }
      }

      // Preparar datos para la plantilla
      const trackingUrl =
        orderData.trackingUrl ||
        `${orderData.origin || "https://crixiumdigital.com"}/tracking?order=${
          orderData.orderNumber
        }`;

      const templateData = {
        orderNumber: orderData.orderNumber,
        name: orderData.client || orderData.name,
        total: orderData.total,
        serviceType: orderData.serviceType,
        projectType: orderData.type || orderData.projectType,
        trackingUrl: trackingUrl,
        packageDetails: orderData.details?.package || orderData.packageDetails,
      };

      // IMPORTANTE: Verificar que la función de plantilla existe antes de usarla
      if (typeof orderConfirmationTemplate !== "function") {
        throw new Error("La plantilla de correo no se cargó correctamente");
      }

      // Generar contenido HTML
      const htmlContent = orderConfirmationTemplate(templateData);

      // Verificar que htmlContent no esté vacío
      if (!htmlContent || htmlContent.trim() === "") {
        console.error("La plantilla generó contenido HTML vacío");
        throw new Error("Error al generar contenido HTML del correo");
      }

      // Enviar correo
      const mailOptions = {
        from: {
          name: "Crixium Digital",
          address: "contact@crixiumdigital.com",
        },
        to: orderData.email,
        subject: `Confirmación de Pedido #${orderData.orderNumber} - Crixium Digital`,
        html: htmlContent,
        replyTo: "contact@crixiumdigital.com",
      };

      // Log de depuración antes de enviar
      console.log(
        `Enviando correo para pedido ${orderData.orderNumber} con contenido HTML de ${htmlContent.length} caracteres`
      );

      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Correo de confirmación enviado para el pedido ${orderData.orderNumber}. MessageId: ${info.messageId}`
      );

      // Actualizar el estado de envío de correo en Firestore
      if (orderData.orderNumber) {
        const ordersRef = admin.firestore().collection("orders");
        const snapshot = await ordersRef
          .where("orderNumber", "==", orderData.orderNumber)
          .get();

        if (!snapshot.empty) {
          const orderDoc = snapshot.docs[0];
          await orderDoc.ref.update({
            emailSent: true,
            emailSentDate: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      return {
        success: true,
        messageId: info.messageId,
        message: "Correo enviado correctamente",
      };
    } catch (error) {
      console.error("Error al enviar correo de confirmación:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
);

/**
 * Cloud Function para enviar correo de actualización de estado
 */
exports.sendOrderStatusEmail = onCall(
  {
    maxInstances: 10,
  },
  async (data) => {
    try {
      const { orderData, message } = data.data;

      if (!orderData || !orderData.email) {
        throw new Error("Datos de pedido incompletos");
      }

      // Preparar datos para la plantilla
      const trackingUrl =
        orderData.trackingUrl ||
        `${orderData.origin || "https://crixiumdigital.com"}/tracking?order=${
          orderData.orderNumber
        }`;

      const templateData = {
        orderNumber: orderData.orderNumber,
        name: orderData.client || orderData.name,
        status: orderData.status,
        trackingUrl: trackingUrl,
        message: message || "",
      };

      // Verificar que la función de plantilla existe
      if (typeof orderStatusUpdateTemplate !== "function") {
        throw new Error(
          "La plantilla de correo de estado no se cargó correctamente"
        );
      }

      // Generar contenido HTML
      const htmlContent = orderStatusUpdateTemplate(templateData);

      // Verificar que htmlContent no esté vacío
      if (!htmlContent || htmlContent.trim() === "") {
        console.error("La plantilla de estado generó contenido HTML vacío");
        throw new Error("Error al generar contenido HTML del correo de estado");
      }

      // Enviar correo
      const mailOptions = {
        from: {
          name: "Crixium Digital",
          address: "contact@crixiumdigital.com",
        },
        to: orderData.email,
        subject: `Actualización de tu Pedido #${orderData.orderNumber} - Crixium Digital`,
        html: htmlContent,
        replyTo: "contact@crixiumdigital.com",
      };

      const info = await transporter.sendMail(mailOptions);

      // Actualizar el registro de envío de correo en Firestore
      if (orderData.orderNumber) {
        const ordersRef = admin.firestore().collection("orders");
        const snapshot = await ordersRef
          .where("orderNumber", "==", orderData.orderNumber)
          .get();

        if (!snapshot.empty) {
          const orderDoc = snapshot.docs[0];
          await orderDoc.ref.update({
            lastEmailSent: admin.firestore.FieldValue.serverTimestamp(),
            lastEmailType: "status_update",
          });
        }
      }

      return {
        success: true,
        messageId: info.messageId,
        message: "Correo de actualización enviado correctamente",
      };
    } catch (error) {
      console.error("Error al enviar correo de actualización:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
);

/**
 * Cloud Function que se activa cuando cambia el estado de pago de un pedido
 * y envía automáticamente el correo de confirmación
 */
exports.onOrderPaymentStatusChange = onDocumentUpdated(
  "orders/{orderId}",
  async (event) => {
    try {
      // Obtener los datos antes y después del cambio
      const beforeData = event.data.before.data();
      const afterData = event.data.after.data();

      // Verificar si el estado de pago cambió a 'approved' y no se ha enviado correo
      if (
        beforeData.paymentStatus !== "approved" &&
        afterData.paymentStatus === "approved" &&
        !afterData.emailSent
      ) {
        // Verificar si se ha enviado un correo recientemente
        if (afterData.emailSentDate) {
          const emailSentDate = afterData.emailSentDate.toDate();
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

          if (emailSentDate > tenMinutesAgo) {
            console.log(
              `Correo ya enviado recientemente para el pedido ${afterData.orderNumber}, omitiendo envío automático`
            );
            return null;
          }
        }

        // IMPORTANTE: Marcar que vamos a enviar correo para evitar envíos duplicados
        // Actualizar el documento antes de enviar el correo
        await event.data.after.ref.update({
          emailSent: true,
          emailSentDate: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Construir la URL de seguimiento
        const trackingUrl = `https://crixiumdigital.com/tracking?order=${afterData.orderNumber}`;

        // Preparar datos para la plantilla
        const templateData = {
          orderNumber: afterData.orderNumber,
          name: afterData.client || afterData.name,
          total: afterData.total,
          serviceType: afterData.serviceType,
          projectType: afterData.type || afterData.projectType,
          trackingUrl: trackingUrl,
          packageDetails:
            afterData.details?.package || afterData.packageDetails,
        };

        // Verificar que la función de plantilla existe
        if (typeof orderConfirmationTemplate !== "function") {
          console.error(
            "La plantilla de correo no se cargó correctamente en el trigger"
          );
          return null;
        }

        // Generar contenido HTML
        const htmlContent = orderConfirmationTemplate(templateData);

        // Verificar que htmlContent no esté vacío
        if (!htmlContent || htmlContent.trim() === "") {
          console.error(
            "La plantilla generó contenido HTML vacío en el trigger"
          );
          return null;
        }

        // Enviar correo
        const mailOptions = {
          from: {
            name: "Crixium Digital",
            address: "contact@crixiumdigital.com",
          },
          to: afterData.email,
          subject: `Confirmación de Pedido #${afterData.orderNumber} - Crixium Digital`,
          html: htmlContent,
          replyTo: "contact@crixiumdigital.com",
        };

        console.log(
          `Enviando correo automático para el pedido ${afterData.orderNumber}`
        );
        const info = await transporter.sendMail(mailOptions);
        console.log(
          `Correo automático enviado para pedido ${afterData.orderNumber}. MessageId: ${info.messageId}`
        );
      }

      return null;
    } catch (error) {
      console.error("Error en onOrderPaymentStatusChange:", error);
      return null;
    }
  }
);

// Función auxiliar para enviar correos genéricos
exports.sendGenericEmail = onCall(
  {
    maxInstances: 10,
  },
  async (data) => {
    try {
      const { to, subject, htmlContent } = data.data;

      if (!to || !subject || !htmlContent) {
        throw new Error("Faltan datos requeridos para el envío de correo");
      }

      // Enviar correo
      const mailOptions = {
        from: {
          name: "Crixium Digital",
          address: "contact@crixiumdigital.com",
        },
        to: to,
        subject: subject,
        html: htmlContent,
        replyTo: "contact@crixiumdigital.com",
      };

      const info = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
        message: "Correo enviado correctamente",
      };
    } catch (error) {
      console.error("Error al enviar correo genérico:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
);
