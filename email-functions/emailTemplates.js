// functions/emailTemplates.js - Plantillas HTML para correos electrónicos

/**
 * Genera el HTML para el correo de confirmación de pedido
 *
 * @param {Object} data - Datos para la plantilla
 * @returns {string} - HTML del correo
 */
exports.orderConfirmationTemplate = (data) => {
  const { orderNumber, name, total, serviceType, projectType, trackingUrl } =
    data;

  // Formatear el tipo de servicio para mostrarlo
  const getServiceTypeText = () => {
    if (projectType === "ecommerce") {
      return serviceType === "shopify"
        ? "Tienda Shopify"
        : "Tienda WooCommerce";
    } else if (projectType === "website") {
      return serviceType === "custom"
        ? "Sitio Web con Código Personalizado"
        : "Sitio Web WordPress";
    } else if (projectType === "music") {
      return data.packageDetails?.category === "jingle"
        ? "Jingle Musical"
        : "Locución";
    } else {
      return "Proyecto";
    }
  };

  return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de pedido</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #6b21a8;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9fafb;
            }
            .footer {
              background-color: #f3f4f6;
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .button {
              display: inline-block;
              background-color: #6b21a8;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 15px;
            }
            .info-block {
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 5px;
              padding: 15px;
              margin-bottom: 15px;
            }
            .order-number {
              font-family: monospace;
              font-size: 18px;
              font-weight: bold;
              padding: 5px 10px;
              background-color: #f3f4f6;
              border-radius: 4px;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Confirmación de Pedido</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>
              <p>¡Gracias por tu pedido! Hemos recibido tu solicitud y estamos trabajando en ella.</p>
              
              <div class="info-block">
                <p>Tu número de pedido es: <span class="order-number">${orderNumber}</span></p>
                <p>Servicio: <strong>${getServiceTypeText()}</strong></p>
                <p>Total: <strong>$${total} USD</strong></p>
              </div>
              
              <p>Puedes hacer seguimiento de tu pedido en cualquier momento utilizando el enlace a continuación:</p>
              <p style="text-align: center;">
                <a href="${trackingUrl}" class="button">Seguir mi pedido</a>
              </p>
              
              <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en responder a este correo o contactarnos a través de nuestro sitio web.</p>
              
              <p>Saludos,<br>
              El equipo de Crixium Digital</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas directamente a este mensaje.</p>
              <p>&copy; ${new Date().getFullYear()} Crixium Digital. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `;
};

/**
 * Genera el HTML para el correo de actualización de estado del pedido
 *
 * @param {Object} data - Datos para la plantilla
 * @returns {string} - HTML del correo
 */
exports.orderStatusUpdateTemplate = (data) => {
  const { orderNumber, name, status, trackingUrl, message } = data;

  const getStatusText = () => {
    switch (status) {
      case "in-progress":
        return "En progreso";
      case "review":
        return "En revisión";
      case "completed":
        return "Completado";
      default:
        return "Actualizado";
    }
  };

  return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Actualización de tu pedido</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #6b21a8;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9fafb;
            }
            .footer {
              background-color: #f3f4f6;
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .button {
              display: inline-block;
              background-color: #6b21a8;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 15px;
            }
            .info-block {
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 5px;
              padding: 15px;
              margin-bottom: 15px;
            }
            .status-badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 14px;
              font-weight: bold;
              background-color: #f3f4f6;
            }
            .status-in-progress { background-color: #fef3c7; color: #92400e; }
            .status-review { background-color: #e0e7ff; color: #4338ca; }
            .status-completed { background-color: #d1fae5; color: #065f46; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Actualización de tu Pedido</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>
              <p>Tu pedido ha sido actualizado.</p>
              
              <div class="info-block">
                <p>Pedido #<strong>${orderNumber}</strong></p>
                <p>Estado: <span class="status-badge status-${status}">${getStatusText()}</span></p>
                ${message ? `<p>Mensaje: ${message}</p>` : ""}
              </div>
              
              <p>Puedes ver más detalles y el progreso actual de tu proyecto en nuestra plataforma:</p>
              <p style="text-align: center;">
                <a href="${trackingUrl}" class="button">Ver detalles del pedido</a>
              </p>
              
              <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en responder a este correo o contactarnos a través de nuestro sitio web.</p>
              
              <p>Saludos,<br>
              El equipo de Crixium Digital</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas directamente a este mensaje.</p>
              <p>&copy; ${new Date().getFullYear()} Crixium Digital. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `;
};

// Las funciones ya han sido exportadas anteriormente con exports.
// No es necesario volver a exportarlas aquí, lo que estaba causando el error.
