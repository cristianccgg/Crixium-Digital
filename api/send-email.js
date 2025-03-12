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
    const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

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
    console.error(
      "Error al enviar correo:",
      error.response?.data || error.message
    );

    // Devolver error
    return res.status(500).json({
      success: false,
      message: error.message || "Error al enviar correo",
    });
  }
}
