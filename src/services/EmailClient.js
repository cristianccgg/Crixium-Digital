// src/services/EmailClient.js - Cliente para interactuar con las Cloud Functions v2 de correo

import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

/**
 * Cliente para enviar correos electrónicos usando Firebase Cloud Functions v2
 */
class EmailClient {
  constructor() {
    // Especificar la región correcta
    this.functions = getFunctions();

    // Descomentar estas líneas si estás probando localmente con el emulador de funciones
    // if (process.env.NODE_ENV !== 'production') {
    //   connectFunctionsEmulator(this.functions, "localhost", 5001);
    // }

    // Inicializar las funciones
    this.sendOrderConfirmation = httpsCallable(
      this.functions,
      "sendOrderConfirmationEmail"
    );
    this.sendOrderStatus = httpsCallable(
      this.functions,
      "sendOrderStatusEmail"
    );
    this.sendGenericEmail = httpsCallable(this.functions, "sendGenericEmail");
  }

  /**
   * Envía un correo de confirmación de pedido
   *
   * @param {Object} orderData - Datos del pedido
   * @returns {Promise<Object>} - Resultado de la operación
   */
  async sendOrderConfirmationEmail(orderData) {
    try {
      if (!orderData.email) {
        console.error(
          "No se pudo enviar el correo: email del destinatario no especificado"
        );
        return {
          success: false,
          message: "Email del destinatario no especificado",
        };
      }

      // Agregar la URL de origen para construcción de enlaces
      const origin = window.location.origin;

      // Asegurarse de que el objeto orderData contiene todos los campos necesarios
      const preparedOrderData = {
        ...orderData,
        origin,
      };

      console.log(
        "Enviando correo de confirmación con datos:",
        preparedOrderData
      );

      // Llamar a la Cloud Function
      const result = await this.sendOrderConfirmation({
        orderData: preparedOrderData,
      });

      console.log("Resultado de la función:", result);
      return result.data;
    } catch (error) {
      console.error("Error al enviar correo de confirmación:", error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Envía un correo de actualización de estado de pedido
   *
   * @param {Object} orderData - Datos del pedido
   * @param {string} message - Mensaje personalizado
   * @returns {Promise<Object>} - Resultado de la operación
   */
  async sendOrderStatusEmail(orderData, message = "") {
    try {
      if (!orderData.email) {
        console.error(
          "No se pudo enviar el correo: email del destinatario no especificado"
        );
        return {
          success: false,
          message: "Email del destinatario no especificado",
        };
      }

      // Agregar la URL de origen para construcción de enlaces
      const origin = window.location.origin;

      // Preparar datos para la Cloud Function
      const data = {
        orderData: {
          ...orderData,
          origin,
        },
        message,
      };

      console.log("Enviando correo de estado con datos:", data);

      // Llamar a la Cloud Function
      const result = await this.sendOrderStatus(data);

      console.log("Resultado de la función:", result);
      return result.data;
    } catch (error) {
      console.error("Error al enviar correo de estado:", error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Envía un correo genérico
   *
   * @param {string} to - Email del destinatario
   * @param {string} subject - Asunto del correo
   * @param {string} htmlContent - Contenido HTML del correo
   * @returns {Promise<Object>} - Resultado de la operación
   */
  async sendEmail(to, subject, htmlContent) {
    try {
      // Llamar a la Cloud Function
      const result = await this.sendGenericEmail({
        to,
        subject,
        htmlContent,
      });

      console.log("Resultado de la función:", result);
      return result.data;
    } catch (error) {
      console.error("Error al enviar correo genérico:", error);
      return { success: false, message: error.message };
    }
  }
}

// Crear y exportar una instancia singleton
export const emailClient = new EmailClient();

// Funciones simplificadas para fácil importación
export const sendOrderConfirmationEmail = async (orderData) => {
  return await emailClient.sendOrderConfirmationEmail(orderData);
};

export const sendOrderStatusEmail = async (orderData, message = "") => {
  return await emailClient.sendOrderStatusEmail(orderData, message);
};

export const sendEmail = async (to, subject, htmlContent) => {
  return await emailClient.sendEmail(to, subject, htmlContent);
};

// Exportar por defecto para facilitar la importación
export default {
  sendOrderConfirmationEmail,
  sendOrderStatusEmail,
  sendEmail,
  client: emailClient,
};
