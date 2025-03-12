// src/services/EmailClient.js
import { getFunctions, httpsCallable } from "firebase/functions";

/**
 * Envía correo de confirmación de pedido - DESACTIVADO TEMPORALMENTE
 * @param {Object} orderData - Datos del pedido
 * @returns {Promise<Object>} - Resultado simulado (éxito)
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  console.log(
    "Función de envío de correo de confirmación desactivada temporalmente"
  );
  console.log(
    "Datos del pedido que no se enviarán por correo:",
    orderData.orderNumber
  );

  // Devolver éxito simulado para no interrumpir el flujo de la aplicación
  return {
    success: true,
    simulated: true,
    message: "Email simulado (función desactivada para reducir costos)",
  };
};

/**
 * Envía correo de actualización de estado - DESACTIVADO TEMPORALMENTE
 * @param {Object} orderData - Datos del pedido
 * @param {string} customMessage - Mensaje personalizado
 * @returns {Promise<Object>} - Resultado simulado (éxito)
 */
export const sendOrderStatusEmail = async (orderData, customMessage = "") => {
  console.log("Función de envío de correo de estado desactivada temporalmente");
  console.log(
    "Datos del pedido que no se enviarán por correo:",
    orderData.orderNumber
  );

  // Devolver éxito simulado para no interrumpir el flujo de la aplicación
  return {
    success: true,
    simulated: true,
    message: "Email simulado (función desactivada para reducir costos)",
  };
};

/**
 * Envía correo del formulario de contacto - ESTA FUNCIÓN SÍ ESTÁ ACTIVA
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const sendContactFormEmail = async (formData) => {
  try {
    // Validar datos mínimos
    if (!formData.email || !formData.name || !formData.message) {
      return {
        success: false,
        message: "Faltan datos requeridos para enviar el formulario",
      };
    }

    // Obtener función de Firebase
    const functions = getFunctions();
    const sendContactEmail = httpsCallable(functions, "sendContactFormEmail");

    // Llamar a la función de Firebase
    const result = await sendContactEmail(formData);

    return result.data;
  } catch (error) {
    console.error("Error al enviar formulario de contacto:", error);
    return { success: false, message: error.message };
  }
};

export default {
  sendOrderConfirmationEmail,
  sendOrderStatusEmail,
  sendContactFormEmail,
};
