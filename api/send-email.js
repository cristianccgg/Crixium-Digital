// api/send-email.js
import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  // Solo permitir solicitudes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { from, to, cc, subject, html, replyTo } = req.body;

    // Validar datos requeridos
    if (!from || !to || !subject || !html) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos requeridos",
      });
    }

    // Configuración de Mailgun
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

    // Verificar que tengamos las variables de entorno necesarias
    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      console.error("Faltan variables de entorno: ", {
        apiKeyExists: !!MAILGUN_API_KEY,
        domainExists: !!MAILGUN_DOMAIN,
      });

      return res.status(500).json({
        success: false,
        message:
          "Error de configuración del servidor: faltan variables de entorno",
        debug: {
          apiKeyExists: !!MAILGUN_API_KEY,
          domainExists: !!MAILGUN_DOMAIN,
          // Mostramos los primeros caracteres de la API key para depuración
          apiKeyStart: MAILGUN_API_KEY
            ? MAILGUN_API_KEY.substring(0, 5) + "..."
            : null,
        },
      });
    }

    const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

    console.log("Enviando email con configuración:", {
      url: MAILGUN_API_URL,
      apiKeyExists: !!MAILGUN_API_KEY,
      from,
      to,
      cc: cc || "No especificado",
      replyTo: replyTo || "No especificado",
    });

    // Crear form data para Mailgun
    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("html", html);

    if (cc) formData.append("cc", cc);
    if (replyTo) formData.append("h:Reply-To", replyTo);

    // Enviar correo a través de Mailgun API
    const response = await axios({
      method: "post",
      url: MAILGUN_API_URL,
      auth: {
        username: "api",
        password: MAILGUN_API_KEY,
      },
      data: formData,
      headers: formData.getHeaders
        ? formData.getHeaders()
        : { "Content-Type": "multipart/form-data" },
    });

    // Devolver respuesta exitosa
    return res.status(200).json({
      success: true,
      message: "Correo enviado correctamente",
      id: response.data.id,
    });
  } catch (error) {
    // Obtener información detallada del error
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack,
    };

    console.error(
      "Error detallado al enviar correo:",
      JSON.stringify(errorDetails, null, 2)
    );

    // Devolver error con más detalles
    return res.status(500).json({
      success: false,
      message: error.message || "Error al enviar correo",
      errorDetails:
        error.response?.data || "No hay detalles adicionales del error",
    });
  }
}
