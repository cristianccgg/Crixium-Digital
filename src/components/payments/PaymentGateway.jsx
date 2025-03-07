import React, { useState, useEffect } from "react";
import { Lock, CreditCard, DollarSign, Globe } from "lucide-react";
import md5 from "md5";

const PaymentGateway = ({ orderData, onSuccess, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [country, setCountry] = useState("Colombia");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalButtonsContainerRef, setPaypalButtonsContainerRef] =
    useState(null);

  // Función para cargar el script de PayPal
  useEffect(() => {
    // Solo cargamos el SDK si no está ya cargado
    if (!window.paypal && (paymentMethod === "paypal" || isInternational)) {
      const script = document.createElement("script");
      // Modo sandbox para pruebas
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AV7RuKAMOnZOLdiHZji_gKV1h3CdljQdQllZuf1m-fpuk6yqLJdL1aIwkvLUFFopVuUPrNfLGhaVY4JJ&currency=USD";
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        // Limpieza al desmontar
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else if (window.paypal) {
      setPaypalLoaded(true);
    }
  }, [paymentMethod, isInternational]);

  // Renderizar botones de PayPal cuando el SDK se carga
  useEffect(() => {
    if (paypalLoaded && window.paypal && paypalButtonsContainerRef) {
      // Limpiar el contenedor antes de renderizar
      paypalButtonsContainerRef.innerHTML = "";

      try {
        window.paypal
          .Buttons({
            // Configurar la transacción cuando se hace clic en el botón de PayPal
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Pago por ${orderData.packageDetails.title}`,
                    amount: {
                      currency_code: "USD",
                      value: orderData.total.toString(),
                    },
                  },
                ],
              });
            },
            // Finalizar la transacción después de la aprobación del pagador
            onApprove: (data, actions) => {
              return actions.order.capture().then(function (details) {
                console.log("Pago completado:", details);
                // Guardar los detalles de la transacción en localStorage
                localStorage.setItem(
                  "paypalTransaction",
                  JSON.stringify({
                    orderID: data.orderID,
                    payerID: data.payerID,
                    details: details,
                  })
                );
                // Actualizar el estado del pedido
                localStorage.setItem("paymentStatus", "approved");
                // Redireccionar a la página de respuesta
                window.location.href = `${window.location.origin}/payment-response?status=approved&reference=${orderData.orderNumber}`;
              });
            },
            onError: (err) => {
              console.error("Error en el pago con PayPal:", err);
              setIsProcessing(false);
              alert(
                "Hubo un error procesando tu pago con PayPal. Por favor, intenta de nuevo."
              );
            },
            onCancel: () => {
              console.log("Pago cancelado por el usuario");
              setIsProcessing(false);
            },
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
            },
          })
          .render(paypalButtonsContainerRef);
      } catch (error) {
        console.error("Error al renderizar botones de PayPal:", error);
      }
    }
  }, [paypalLoaded, paypalButtonsContainerRef, orderData]);

  // Función para generar la firma para PayU
  const generatePayUSignature = (
    apiKey,
    merchantId,
    referenceCode,
    amount,
    currency
  ) => {
    // La firma de PayU: md5(apiKey~merchantId~referenceCode~amount~currency)
    const signature = md5(
      `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`
    );
    return signature;
  };

  // Función para procesar el pago con PayU WebCheckout
  const processPayUPayment = () => {
    setIsProcessing(true);

    // Datos para enviar a PayU - REEMPLAZAR con tus credenciales reales
    const merchantId = "508029";
    const apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    const accountId = "512321";

    // Asegurarse de usar el mismo formato exacto para el referenceCode
    // Esto es importante para asegurar que la extracción del número de pedido funcione correctamente
    const referenceCode = `ORDER-${orderData.orderNumber}`;
    const description = `Pago por ${orderData.packageDetails.title}`;
    const amount = orderData.total;
    const currency = "COP"; // Moneda para Colombia

    // URL a la que PayU redirigirá después del pago
    const responseUrl = `${window.location.origin}/payment-response`;

    // Almacenar información de referencia en localStorage como respaldo
    localStorage.setItem(
      "pendingOrder",
      JSON.stringify({
        orderNumber: orderData.orderNumber,
        referenceCode: referenceCode,
      })
    );

    // Generar firma
    const signature = generatePayUSignature(
      apiKey,
      merchantId,
      referenceCode,
      amount,
      currency
    );

    // Crear formulario para enviar a PayU
    const form = document.createElement("form");
    form.method = "POST";
    form.action =
      "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"; // URL de sandbox para pruebas
    form.target = "_self";

    // Función para añadir campos al formulario
    const createFormField = (name, value) => {
      const field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      field.value = value;
      form.appendChild(field);
    };

    // Añadir campos requeridos
    createFormField("merchantId", merchantId);
    createFormField("accountId", accountId);
    createFormField("description", description);
    createFormField("referenceCode", referenceCode);
    createFormField("amount", amount);
    createFormField("tax", "0");
    createFormField("taxReturnBase", "0");
    createFormField("currency", currency);
    createFormField("signature", signature);
    createFormField("test", "1"); // 1 para pruebas, 0 para producción
    createFormField("responseUrl", responseUrl);

    // Datos del comprador
    if (orderData.name) createFormField("buyerFullName", orderData.name);
    if (orderData.email) createFormField("buyerEmail", orderData.email);
    createFormField("buyerCountry", "CO"); // País del comprador (Colombia)

    // Enviar formulario
    document.body.appendChild(form);
    form.submit();
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleProceedToPayment = () => {
    if (paymentMethod === "payu") {
      processPayUPayment();
    }
    // Para PayPal no necesitamos hacer nada aquí, ya que el botón de PayPal maneja el flujo de pago
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setIsInternational(selectedCountry !== "Colombia");

    // Si cambia a internacional, seleccionamos PayPal automáticamente
    if (selectedCountry !== "Colombia") {
      setPaymentMethod("paypal");
    } else {
      // Si vuelve a Colombia, reseteamos la selección
      setPaymentMethod("");
    }
  };

  // Para el manejo de botones de PayPal en modo internacional
  const setPaypalRef = (ref) => {
    if (ref !== null) {
      setPaypalButtonsContainerRef(ref);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        Selecciona tu método de pago
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Desde dónde realizas tu pago?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleCountryChange("Colombia")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              country === "Colombia"
                ? "border-purple-500 bg-purple-50 text-purple-700"
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <Globe size={20} />
            <span>Colombia</span>
          </button>
          <button
            type="button"
            onClick={() => handleCountryChange("Internacional")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              country === "Internacional"
                ? "border-purple-500 bg-purple-50 text-purple-700"
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <Globe size={20} />
            <span>Internacional</span>
          </button>
        </div>
      </div>

      {isInternational ? (
        // Solo mostramos PayPal para pagos internacionales
        <div className="p-4 border rounded-lg border-purple-500 bg-purple-50">
          <div className="flex flex-col items-center gap-3 p-4">
            <DollarSign className="text-blue-600" size={36} />
            <div className="text-center">
              <h4 className="font-medium">PayPal</h4>
              <p className="text-sm text-gray-500">
                Pago seguro internacional con tarjetas o cuenta PayPal
              </p>
            </div>
            <div className="w-full mt-4" ref={setPaypalRef}>
              {!paypalLoaded && (
                <div className="text-center py-4">
                  <p className="text-sm">Cargando opciones de pago...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Mostramos ambas opciones para pagos en Colombia
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === "payu"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handlePaymentSelection("payu")}
          >
            <div className="flex flex-col items-center gap-3 p-4">
              <CreditCard className="text-purple-700" size={36} />
              <div className="text-center">
                <h4 className="font-medium">PayU</h4>
                <p className="text-sm text-gray-500">
                  Tarjeta de crédito, débito y otros métodos locales
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              paymentMethod === "paypal"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handlePaymentSelection("paypal")}
          >
            <div className="flex flex-col items-center gap-3 p-4">
              <DollarSign className="text-blue-600" size={36} />
              <div className="text-center">
                <h4 className="font-medium">PayPal</h4>
                <p className="text-sm text-gray-500">
                  Cuenta PayPal o tarjetas internacionales
                </p>
              </div>
              {paymentMethod === "paypal" && (
                <div className="w-full mt-4" ref={setPaypalRef}>
                  {!paypalLoaded && (
                    <div className="text-center py-4">
                      <p className="text-sm">Cargando opciones de pago...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(paymentMethod === "payu" || isInternational) && (
        <div className="p-4 bg-purple-50 rounded-lg mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-purple-700" />
            <span className="text-sm text-purple-700 font-medium">
              Pago seguro
            </span>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2">Resumen del Pedido</h4>
            <div className="space-y-1 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Paquete:</span>
                <span>{orderData.packageDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entrega:</span>
                <span>{orderData.packageDetails.delivery}</span>
              </div>
              {orderData.extras && orderData.extras.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Extras:</span>
                  <span>{orderData.extras.length} seleccionados</span>
                </div>
              )}
              <div className="flex justify-between font-bold pt-2 border-t mt-2">
                <span>Total:</span>
                <span>
                  ${orderData.total} {isInternational ? "USD" : "COP"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 my-4">
            {paymentMethod === "payu"
              ? "Serás redirigido a la plataforma de PayU para completar tu compra."
              : "Puedes pagar directamente con PayPal o usando tu tarjeta sin necesidad de cuenta PayPal."}{" "}
            Tu información está protegida con encriptación de 256 bits.
          </p>

          {paymentMethod === "payu" && (
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="button"
                onClick={onBack}
                disabled={isProcessing}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? "Procesando..." : "Proceder al pago con PayU"}
              </button>
            </div>
          )}

          {isInternational && (
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="button"
                onClick={onBack}
                disabled={isProcessing}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Volver
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
