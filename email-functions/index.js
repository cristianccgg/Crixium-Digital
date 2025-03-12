// email-functions/index.js
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Transportador para Zoho
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: "contact@crixiumdigital.com",
      pass: process.env.ZOHO_APP_PASSWORD,
    },
  });
};

// DESACTIVADO: Función para enviar confirmación de pedido
exports.sendOrderConfirmationEmail = functions.https.onCall(
  async (data, context) => {
    // ¡DESACTIVADO TEMPORALMENTE!
    return {
      success: false,
      message:
        "Esta función está temporalmente desactivada para reducir costos",
    };
  }
);

// DESACTIVADO: Función para enviar actualización de estado
exports.sendOrderStatusEmail = functions.https.onCall(async (data, context) => {
  // ¡DESACTIVADO TEMPORALMENTE!
  return {
    success: false,
    message: "Esta función está temporalmente desactivada para reducir costos",
  };
});

// ACTIVO: Función para el formulario de contacto (sí mantenemos esta activa)
exports.sendContactFormEmail = functions.https.onCall(async (data, context) => {
  try {
    // Validar datos mínimos necesarios
    if (!data.email || !data.name || !data.message) {
      return {
        success: false,
        message: "Faltan datos requeridos para enviar el formulario",
      };
    }

    // Crear transportador
    const transporter = createTransporter();

    // Detalles del correo
    const mailOptions = {
      from: '"Formulario de Contacto" <contact@crixiumdigital.com>',
      to: "contact@crixiumdigital.com",
      subject: `Nuevo mensaje: ${data.subject || "Formulario de contacto"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Asunto:</strong> ${data.subject || "No especificado"}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
            ${data.message}
          </div>
        </div>
      `,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Mensaje enviado correctamente",
    };
  } catch (error) {
    console.error("Error al enviar formulario de contacto:", error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
});
