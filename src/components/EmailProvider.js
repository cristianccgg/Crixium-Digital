// // EmailProvider.js - Implementación del servicio de envío de correos

// import {
//   orderConfirmationTemplate,
//   orderStatusUpdateTemplate,
// } from "../../email-functions/emailTemplates";

// /**
//  * Servicio para enviar correos electrónicos utilizando servicios externos
//  * Implementa diferentes proveedores según el entorno (desarrollo/producción)
//  */
// class EmailProvider {
//   constructor() {
//     // Determinar si estamos en producción
//     this.isProduction = process.env.NODE_ENV === "production";

//     // Configurar el servicio de correo según el entorno
//     this.emailService = this.isProduction ? "zoho" : "formspree";

//     // Configuración para Zoho Mail
//     this.zohoConfig = {
//       user: "contact@crixiumdigital.com",
//       fromName: "Crixium Digital",
//       replyTo: "contact@crixiumdigital.com",
//     };

//     // Configuración para servicios alternativos (desarrollo/pruebas)
//     this.formspreeId = "YOUR_FORMSPREE_ID"; // Reemplaza con tu ID de Formspree
//     this.emailjsConfig = {
//       serviceId: "YOUR_EMAILJS_SERVICE_ID",
//       templateId: "YOUR_EMAILJS_TEMPLATE_ID",
//       userId: "YOUR_EMAILJS_USER_ID",
//     };
//   }

//   /**
//    * Envía un correo de confirmación de pedido
//    *
//    * @param {Object} orderData - Datos del pedido
//    * @returns {Promise<Object>} - Resultado de la operación
//    */
//   async sendOrderConfirmation(orderData) {
//     if (!orderData.email) {
//       console.error(
//         "No se pudo enviar el correo: email del destinatario no especificado"
//       );
//       return {
//         success: false,
//         message: "Email del destinatario no especificado",
//       };
//     }

//     // Preparar datos para la plantilla
//     const trackingUrl =
//       orderData.trackingUrl ||
//       `${window.location.origin}/tracking?order=${orderData.orderNumber}`;

//     const templateData = {
//       orderNumber: orderData.orderNumber,
//       name: orderData.client || orderData.name,
//       total: orderData.total,
//       serviceType: orderData.serviceType,
//       projectType: orderData.type || orderData.projectType,
//       trackingUrl,
//       packageDetails: orderData.details?.package || orderData.packageDetails,
//     };

//     // Generar contenido HTML
//     const htmlContent = orderConfirmationTemplate(templateData);

//     // Asunto del correo
//     const subject = `Confirmación de Pedido #${orderData.orderNumber} - Crixium Digital`;

//     // Enviar correo según el proveedor configurado
//     return await this.sendEmail(orderData.email, subject, htmlContent);
//   }

//   /**
//    * Envía un correo de actualización de estado de pedido
//    *
//    * @param {Object} orderData - Datos del pedido
//    * @param {string} message - Mensaje personalizado
//    * @returns {Promise<Object>} - Resultado de la operación
//    */
//   async sendStatusUpdate(orderData, message = "") {
//     if (!orderData.email) {
//       console.error(
//         "No se pudo enviar el correo: email del destinatario no especificado"
//       );
//       return {
//         success: false,
//         message: "Email del destinatario no especificado",
//       };
//     }

//     // Preparar datos para la plantilla
//     const trackingUrl =
//       orderData.trackingUrl ||
//       `${window.location.origin}/tracking?order=${orderData.orderNumber}`;

//     const templateData = {
//       orderNumber: orderData.orderNumber,
//       name: orderData.client || orderData.name,
//       status: orderData.status,
//       trackingUrl,
//       message: message,
//     };

//     // Generar contenido HTML
//     const htmlContent = orderStatusUpdateTemplate(templateData);

//     // Asunto del correo
//     const subject = `Actualización de tu Pedido #${orderData.orderNumber} - Crixium Digital`;

//     // Enviar correo
//     return await this.sendEmail(orderData.email, subject, htmlContent);
//   }

//   /**
//    * Método genérico para enviar correos
//    *
//    * @param {string} to - Email del destinatario
//    * @param {string} subject - Asunto del correo
//    * @param {string} htmlContent - Contenido HTML del correo
//    * @returns {Promise<Object>} - Resultado de la operación
//    */
//   async sendEmail(to, subject, htmlContent) {
//     try {
//       let result;

//       // Usar el proveedor configurado
//       switch (this.emailService) {
//         case "zoho":
//           result = await this.sendWithZoho(to, subject, htmlContent);
//           break;
//         case "formspree":
//           result = await this.sendWithFormspree(to, subject, htmlContent);
//           break;
//         case "emailjs":
//           result = await this.sendWithEmailJS(to, subject, htmlContent);
//           break;
//         default:
//           // Fallback a formspree si no hay otro configurado
//           result = await this.sendWithFormspree(to, subject, htmlContent);
//       }

//       return result;
//     } catch (error) {
//       console.error("Error al enviar correo:", error);
//       return { success: false, message: error.message };
//     }
//   }

//   /**
//    * Implementación para enviar con Zoho Mail mediante Firebase Function
//    * (requiere configuración del lado del servidor)
//    */
//   async sendWithZoho(to, subject, htmlContent) {
//     try {
//       // En un entorno real, esto llamaría a una Firebase Function
//       // que implementa el envío de correos con Zoho

//       // Para desarrollo, puedes utilizar una solución temporal o un mock
//       console.log("Simulando envío de correo con Zoho a:", to);
//       console.log("Asunto:", subject);

//       // Aquí integrarías con Firebase Functions cuando estés listo para producción
//       // const functions = getFunctions();
//       // const sendMailFunction = httpsCallable(functions, 'sendMail');
//       // const response = await sendMailFunction({
//       //   to,
//       //   subject,
//       //   html: htmlContent,
//       //   from: this.zohoConfig.user,
//       //   fromName: this.zohoConfig.fromName,
//       // });

//       // Simular respuesta exitosa para pruebas
//       return {
//         success: true,
//         message: "Correo enviado correctamente (simulado)",
//       };
//     } catch (error) {
//       console.error("Error al enviar con Zoho:", error);
//       return { success: false, message: error.message };
//     }
//   }

//   /**
//    * Implementación para enviar con Formspree (fácil para desarrollo/pruebas)
//    */
//   async sendWithFormspree(to, subject, htmlContent) {
//     try {
//       // FormSpree es una buena opción para desarrollo y pruebas
//       const response = await fetch(
//         `https://formspree.io/f/${this.formspreeId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: to,
//             subject,
//             message: htmlContent,
//             _template: "html",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Error al enviar con Formspree: ${response.statusText}`
//         );
//       }

//       return {
//         success: true,
//         message: "Correo enviado correctamente con Formspree",
//       };
//     } catch (error) {
//       console.error("Error al enviar con Formspree:", error);
//       return { success: false, message: error.message };
//     }
//   }

//   /**
//    * Implementación para enviar con EmailJS (otra opción para desarrollo)
//    */
//   async sendWithEmailJS(to, subject, htmlContent) {
//     try {
//       // Cargar la librería de EmailJS si es necesario
//       if (typeof emailjs === "undefined") {
//         console.warn("EmailJS no está cargado. Cargándolo ahora...");
//         // Podríamos cargar la librería aquí si fuera necesario
//       }

//       // Preparar los datos para EmailJS
//       const templateParams = {
//         to_email: to,
//         to_name: to.split("@")[0], // Usar la parte local como nombre
//         subject,
//         message_html: htmlContent,
//       };

//       // Enviar con EmailJS
//       const response = await emailjs.send(
//         this.emailjsConfig.serviceId,
//         this.emailjsConfig.templateId,
//         templateParams,
//         this.emailjsConfig.userId
//       );

//       if (response.status !== 200) {
//         throw new Error(`Error al enviar con EmailJS: ${response.text}`);
//       }

//       return {
//         success: true,
//         message: "Correo enviado correctamente con EmailJS",
//       };
//     } catch (error) {
//       console.error("Error al enviar con EmailJS:", error);
//       return { success: false, message: error.message };
//     }
//   }
// }

// // Exportar una instancia singleton
// export const emailProvider = new EmailProvider();

// // Funciones simplificadas para fácil importación

// /**
//  * Envía un correo de confirmación de pedido
//  */
// export const sendOrderConfirmationEmail = async (orderData) => {
//   return await emailProvider.sendOrderConfirmation(orderData);
// };

// /**
//  * Envía un correo de actualización de estado de pedido
//  */
// export const sendOrderStatusEmail = async (orderData, message = "") => {
//   return await emailProvider.sendStatusUpdate(orderData, message);
// };

// /**
//  * Envía un correo genérico
//  */
// export const sendEmail = async (to, subject, htmlContent) => {
//   return await emailProvider.sendEmail(to, subject, htmlContent);
// };

// // Exportar por defecto para facilitar la importación
// export default {
//   sendOrderConfirmationEmail,
//   sendOrderStatusEmail,
//   sendEmail,
//   provider: emailProvider,
// };
