import axios from "axios";

/**
 * Formatea un mensaje para el formulario de contacto
 * @param {Object} formData - Datos del formulario
 * @returns {string} - HTML formateado
 */
const formatContactMessage = (formData) => {
  // Formatear archivos si existen
  let filesSection = "";
  if (formData.fileDetails && formData.fileDetails.length > 0) {
    filesSection = `
      <h3 style="margin-top: 20px;">Archivos adjuntos:</h3>
      <ul>
        ${formData.fileDetails
          .map(
            (file) => `
          <li>
            <strong>${file.name}</strong> 
            (${(file.size / 1024).toFixed(1)} KB) - 
            <a href="${file.url}" target="_blank">Ver/Descargar</a>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo mensaje de contacto</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #6b21a8;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 5px 5px 0 0;
          margin: -20px -20px 20px;
        }
        .section {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .label {
          font-weight: bold;
          color: #6b21a8;
        }
        .message-box {
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #e5e7eb;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin:0;">Nuevo mensaje de contacto</h2>
        </div>
        
        <div class="section">
          <span class="label">Nombre:</span> ${formData.name}
        </div>
        
        <div class="section">
          <span class="label">Email:</span> ${formData.email}
        </div>
        
        <div class="section">
          <span class="label">Teléfono:</span> ${
            formData.phone || "No proporcionado"
          }
        </div>
        
        <div class="section">
          <span class="label">Servicio:</span> ${
            formData.service || "No especificado"
          }
        </div>
        
        <div class="section">
          <span class="label">Tipo de proyecto:</span> ${
            formData.projectType || "No especificado"
          }
        </div>
        
        <div class="section">
          <span class="label">Presupuesto:</span> ${
            formData.budget || "No especificado"
          }
        </div>
        
        <div class="section">
          <span class="label">Descripción:</span>
          <div class="message-box">
            ${
              formData.description?.replace(/\n/g, "<br>") || "No proporcionada"
            }
          </div>
        </div>
        
        ${filesSection}
        
        <div style="font-size: 12px; color: #6b7280; margin-top: 20px; text-align: center;">
          Mensaje enviado desde el formulario de contacto de Crixium Digital<br>
          Fecha: ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Envía un correo electrónico a través de la API route de Vercel
 * @param {Object} options - Opciones del correo
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const sendEmail = async (options) => {
  try {
    const { from, to, subject, html, cc, bcc, replyTo } = options;

    // Enviar correo a través de nuestra API route
    const response = await axios({
      method: "post",
      url: "/api/send-email",
      data: {
        from,
        to,
        subject,
        html,
        cc,
        bcc,
        replyTo,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al enviar correo con Mailgun:", error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Error al enviar correo",
    };
  }
};

/**
 * Envía un correo de contacto
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const sendContactForm = async (formData) => {
  try {
    // Validar datos mínimos
    if (!formData.email || !formData.name || !formData.description) {
      return {
        success: false,
        message: "Faltan datos requeridos para enviar el formulario",
      };
    }

    // Formatear el HTML con los datos del formulario
    const htmlContent = formatContactMessage(formData);

    // Opciones del correo
    const mailOptions = {
      from: "Formulario de Contacto <contact@crixiumdigital.com>",
      to: "contact@crixiumdigital.com",
      cc: "cristianccggg@gmail.com",
      subject: `Nuevo mensaje: ${formData.service || "Formulario de contacto"}`,
      html: htmlContent,
      replyTo: formData.email,
    };

    // Enviar correo
    return await sendEmail(mailOptions);
  } catch (error) {
    console.error("Error al enviar formulario de contacto:", error.message);
    return {
      success: false,
      message: "Error al enviar formulario",
    };
  }
};

export default {
  sendEmail,
  sendContactForm,
};
