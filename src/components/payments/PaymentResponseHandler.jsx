import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, AlertCircle, Loader } from "lucide-react";
import {
  updateOrderPaymentStatus,
  getOrderByNumber,
} from "../OrderManagerFirebase";
import { sendOrderConfirmationEmail } from "/src/services/EmailClient";

// Esta función toma los parámetros de la URL y los convierte en un objeto
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentResponseHandler = () => {
  const [status, setStatus] = useState("processing");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const processPaymentResponse = async () => {
      try {
        // Verificar primero si es una respuesta directa de PayPal
        const urlStatus = query.get("status");
        const reference = query.get("reference") || "";

        // Si tenemos una respuesta directa de PayPal
        if (urlStatus && reference) {
          setOrderNumber(reference);

          // Obtener detalles guardados en localStorage
          const paypalTransaction = localStorage.getItem("paypalTransaction");

          if (urlStatus === "approved" && paypalTransaction) {
            setStatus("approved");
            setMessage("¡Pago exitoso! Tu pedido ha sido aprobado.");
            setPaymentMethod("paypal");

            // Actualizar el estado de la orden en la base de datos
            const updateResult = await updateOrderPaymentStatus(
              reference,
              "approved"
            );

            // Verificar si el correo ya fue enviado anteriormente
            if (updateResult.success) {
              // Si la orden ya tiene marcado emailSent como true, no volvemos a enviar
              if (updateResult.order && updateResult.order.emailSent) {
                console.log("El correo ya fue enviado anteriormente");
                setEmailSent(true);
              } else {
                // Solo intentar enviar si no se ha enviado antes
                try {
                  // Obtener los datos de la orden actualizada
                  const order = await getOrderByNumber(reference);

                  if (order && order.email) {
                    // Construir la URL de seguimiento
                    const trackingUrl = `${window.location.origin}/tracking?order=${reference}`;

                    // Enviar correo de confirmación usando el cliente
                    const emailResult = await sendOrderConfirmationEmail({
                      ...order,
                      trackingUrl,
                    });

                    // Verificar si el correo se envió o si ya estaba enviado
                    setEmailSent(
                      emailResult.success || emailResult.alreadySent
                    );
                  }
                } catch (emailError) {
                  console.error(
                    "Error al enviar correo de confirmación:",
                    emailError
                  );
                  // No bloqueamos el flujo si falla el envío de correo
                }
              }
            }

            // Limpiar datos de localStorage - MANTENER ESTAS LIMPIEZAS
            localStorage.removeItem("paypalTransaction");
            localStorage.removeItem("pendingOrder");
          } else {
            setStatus("unknown");
            setMessage(
              "No pudimos verificar el estado de tu pago. Contactaremos contigo pronto."
            );
          }

          return;
        }

        // Procesar respuesta de PayU
        const referenceCode = query.get("referenceCode") || "";
        const transactionState = query.get("transactionState") || "";
        const signature = query.get("signature") || "";

        // Verificar si tenemos datos de PayU
        if (referenceCode && transactionState) {
          // Fix: Extraer correctamente el número de pedido del referenceCode
          // Asumiendo formato "ORDER-{orderNumber}"
          const orderNumberMatch = referenceCode.match(/ORDER-(.+)/);
          const reference = orderNumberMatch
            ? orderNumberMatch[1]
            : referenceCode;

          setOrderNumber(reference);
          setPaymentMethod("payu");

          // Verificar la firma (importante para seguridad)
          // Aquí deberías implementar tu lógica para validar la firma recibida
          const isValidSignature = true; // Placeholder - implementar validación real

          if (!isValidSignature) {
            setStatus("error");
            setMessage(
              "Firma inválida. La transacción no pudo ser verificada."
            );
            return;
          }

          let paymentStatus;
          let statusMessage;

          switch (transactionState) {
            case "4":
              paymentStatus = "approved";
              statusMessage = "¡Pago exitoso! Tu pedido ha sido aprobado.";
              break;
            case "6":
              paymentStatus = "rejected";
              statusMessage =
                "Pago rechazado. Por favor, intenta con otro método de pago.";
              break;
            case "7":
              paymentStatus = "pending";
              statusMessage =
                "Pago en proceso. Te notificaremos cuando se complete.";
              break;
            default:
              paymentStatus = "unknown";
              statusMessage =
                "Estado de pago desconocido. Nos pondremos en contacto contigo pronto.";
          }

          // Actualizar el estado de la orden en tu base de datos
          const updateResult = await updateOrderPaymentStatus(
            reference,
            paymentStatus
          );

          // Si el pago fue aprobado, verificar si ya se envió correo o si hay que enviarlo
          if (paymentStatus === "approved" && updateResult.success) {
            if (updateResult.order && updateResult.order.emailSent) {
              // Si ya se envió, solo actualizar el estado en la UI
              setEmailSent(true);
            } else {
              // Solo intentar enviar si no se ha enviado antes
              try {
                // Obtener los datos de la orden actualizada
                const order = await getOrderByNumber(reference);

                if (order && order.email) {
                  // Construir la URL de seguimiento
                  const trackingUrl = `${window.location.origin}/tracking?order=${reference}`;

                  // Enviar correo de confirmación usando el cliente
                  const emailResult = await sendOrderConfirmationEmail({
                    ...order,
                    trackingUrl,
                  });

                  setEmailSent(emailResult.success || emailResult.alreadySent);
                }
              } catch (emailError) {
                console.error(
                  "Error al enviar correo de confirmación:",
                  emailError
                );
                // No bloqueamos el flujo si falla el envío de correo
              }
            }
          }

          // Obtener la información actualizada del pedido para mostrar el número correcto
          const updatedOrder = await getOrderByNumber(reference);
          if (updatedOrder) {
            setOrderNumber(updatedOrder.orderNumber);
          }

          setStatus(paymentStatus);
          setMessage(statusMessage);
        } else {
          // Si no tenemos parámetros específicos, verificamos localStorage como fallback
          const pendingOrderJson = localStorage.getItem("pendingOrder");
          const paymentStatus = localStorage.getItem("paymentStatus");

          if (pendingOrderJson && paymentStatus) {
            const pendingOrder = JSON.parse(pendingOrderJson);
            setOrderNumber(pendingOrder.orderNumber);

            if (paymentStatus === "approved") {
              setStatus("approved");
              setMessage("¡Pago exitoso! Tu pedido ha sido aprobado.");

              // Actualizar en base de datos
              const updateResult = await updateOrderPaymentStatus(
                pendingOrder.orderNumber,
                "approved"
              );

              // Verificar si ya se envió el correo o si hay que enviarlo
              if (updateResult.success) {
                if (updateResult.order && updateResult.order.emailSent) {
                  // Si ya se envió, solo actualizar el estado en la UI
                  setEmailSent(true);
                } else {
                  // Solo intentar enviar si no se ha enviado antes
                  try {
                    // Obtener los datos de la orden actualizada
                    const order = await getOrderByNumber(
                      pendingOrder.orderNumber
                    );

                    if (order && order.email) {
                      // Construir la URL de seguimiento
                      const trackingUrl = `${window.location.origin}/tracking?order=${pendingOrder.orderNumber}`;

                      // Enviar correo de confirmación usando el cliente
                      const emailResult = await sendOrderConfirmationEmail({
                        ...order,
                        trackingUrl,
                      });

                      setEmailSent(
                        emailResult.success || emailResult.alreadySent
                      );
                    }
                  } catch (emailError) {
                    console.error(
                      "Error al enviar correo de confirmación:",
                      emailError
                    );
                    // No bloqueamos el flujo si falla el envío de correo
                  }
                }
              }
            } else if (paymentStatus === "canceled") {
              setStatus("rejected");
              setMessage(
                "El pago fue cancelado. Por favor, intenta nuevamente."
              );
            } else {
              setStatus("unknown");
              setMessage(
                "Estado de pago desconocido. Nos pondremos en contacto contigo pronto."
              );
            }

            // Limpiar localStorage - MANTENER ESTAS LIMPIEZAS
            localStorage.removeItem("pendingOrder");
            localStorage.removeItem("paymentStatus");
          } else {
            setStatus("error");
            setMessage(
              "No pudimos encontrar información sobre tu pedido. Por favor, contacta con soporte."
            );
          }
        }
      } catch (error) {
        console.error("Error al procesar respuesta de pago:", error);
        setStatus("error");
        setMessage("Ocurrió un error al procesar la respuesta del pago.");
      }
    };

    processPaymentResponse();
  }, [query]);

  const handleRedirect = () => {
    if (status === "approved") {
      navigate(`/tracking?order=${orderNumber}`);
    } else {
      // Para pagos rechazados o con errores, volver al inicio
      navigate("/");
    }
  };

  // Renderizar según el estado del pago
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
      {status === "processing" ? (
        <div className="py-8">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Loader className="text-purple-600 animate-spin" size={48} />
          </div>
          <h2 className="text-xl font-bold mb-4">Procesando tu pago</h2>
          <p className="text-gray-600">
            Por favor espera mientras verificamos tu transacción...
          </p>
        </div>
      ) : status === "approved" ? (
        <div className="py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="p-4 bg-purple-50 rounded-lg inline-block mb-6">
            <p className="text-sm text-gray-700 mb-1">
              Tu número de pedido es:
            </p>
            <p className="text-xl font-mono font-bold">{orderNumber}</p>
          </div>
          {emailSent && (
            <div className="p-4 mb-6 bg-blue-50 rounded-lg inline-block">
              <p className="text-sm text-blue-700">
                Hemos enviado un correo con los detalles de tu pedido a tu
                dirección de email.
              </p>
            </div>
          )}
          <button
            onClick={handleRedirect}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Ver mi pedido
          </button>
        </div>
      ) : (
        <div className="py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {status === "pending" ? "Pago Pendiente" : "Hubo un problema"}
          </h2>
          <p className="text-gray-600 mb-6">{message}</p>
          {status === "pending" && (
            <p className="text-sm bg-yellow-50 p-4 rounded-lg mb-6">
              Tu pago está siendo procesado. Puedes verificar el estado en
              cualquier momento desde la página de seguimiento de pedido con el
              número: <span className="font-bold">{orderNumber}</span>
            </p>
          )}
          <button
            onClick={handleRedirect}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            {status === "pending" ? "Ver mi pedido" : "Volver al inicio"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentResponseHandler;
