import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
  File,
  Paperclip,
  Send,
  X,
  Loader,
} from "lucide-react";
import {
  getOrderByNumber,
  addOrderComment,
  uploadOrderFiles,
} from "./OrderManagerFirebase";

const OrderTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState(() => {
    // Extraer número de pedido de los query params (si existe)
    const params = new URLSearchParams(location.search);
    return params.get("order") || "";
  });
  const [orderFound, setOrderFound] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para el formulario de comentarios
  const [commentText, setCommentText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Ejemplos para mostrar en la interfaz
  const sampleOrders = {
    "WEB-2025-1001": "Proyecto web en desarrollo",
    "MUSIC-2025-2001": "Jingle en fase de revisión",
  };

  // Buscar el pedido automáticamente si viene en la URL
  useEffect(() => {
    if (orderNumber) {
      handleSearch({ preventDefault: () => {} });
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCommentSuccess(false);
    setLoading(true);

    if (!orderNumber.trim()) {
      setError("Por favor, ingresa un número de pedido");
      setLoading(false);
      return;
    }

    try {
      // Buscar en Firebase usando OrderManagerFirebase
      const order = await getOrderByNumber(orderNumber);

      if (order) {
        console.log("Orden encontrada:", order); // Para depuración
        setOrderDetails(order);
        setOrderFound(true);
      } else {
        setError(
          "No se encontró ningún pedido con ese número. Por favor, verifica e intenta nuevamente."
        );
        setOrderFound(false);
      }
    } catch (error) {
      console.error("Error al buscar pedido:", error);
      setError(
        "Hubo un problema al buscar el pedido. Por favor, intenta de nuevo."
      );
      setOrderFound(false);
    }

    setLoading(false);
  };

  // Manejar la subida de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  // Eliminar un archivo adjunto
  const removeAttachment = (fileName) => {
    setAttachments((prev) => prev.filter((file) => file.name !== fileName));
  };

  // Enviar un comentario
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    setIsSubmitting(true);

    try {
      // Subir archivos adjuntos a Firebase Storage si existen
      let fileUploadResult = { success: true, fileNames: [] };

      if (attachments.length > 0) {
        fileUploadResult = await uploadOrderFiles(
          orderNumber,
          attachments,
          "comments"
        );

        if (!fileUploadResult.success) {
          throw new Error(
            fileUploadResult.message || "Error al subir archivos"
          );
        }
      }

      // Obtener nombres de archivos adjuntos
      const attachmentNames =
        fileUploadResult.fileNames || attachments.map((file) => file.name);

      const result = await addOrderComment(
        orderNumber,
        commentText,
        false, // no es una entrega
        null, // no hay archivo de entrega
        true, // es del cliente
        attachmentNames // nombres de archivos
      );

      if (result.success) {
        // Actualizar la vista con el pedido actualizado
        const updatedOrder = await getOrderByNumber(orderNumber);
        setOrderDetails(updatedOrder);

        // Limpiar el formulario
        setCommentText("");
        setAttachments([]);
        setCommentSuccess(true);

        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => setCommentSuccess(false), 3000);
      } else {
        setError(
          result.message ||
            "No se pudo enviar el comentario. Por favor, intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      setError(
        "Hubo un error al procesar tu comentario. Por favor, intenta de nuevo."
      );
    }

    setIsSubmitting(false);
  };

  // Renderiza los pasos del pedido con una línea de tiempo
  const renderOrderSteps = (steps) => {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Progreso del proyecto</h3>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-6 relative">
              {/* Línea conectora */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-5 top-6 w-0.5 h-full ${
                    step.completed ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}

              {/* Círculo de estado */}
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  step.currentStage
                    ? "bg-blue-100 border-2 border-blue-600"
                    : step.completed
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              >
                {step.completed ? (
                  <CheckCircle size={20} className="text-white" />
                ) : step.currentStage ? (
                  <Clock size={20} className="text-blue-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                )}
              </div>

              {/* Información del paso */}
              <div>
                <div className="flex items-center">
                  <h4
                    className={`font-medium ${
                      step.currentStage ? "text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {step.name}
                  </h4>
                  {step.currentStage && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Actual
                    </span>
                  )}
                </div>
                {step.date && (
                  <p className="text-sm text-gray-500">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderiza información de archivos de entrega si existen
  const renderDeliveryFiles = (order) => {
    // Buscar en los comentarios si hay alguna entrega
    const deliveryComments =
      order.comments?.filter((comment) => comment.isDelivery) || [];

    if (deliveryComments.length === 0) return null;

    return (
      <div className="mt-8 p-4 border border-blue-100 rounded-lg bg-blue-50">
        <h3 className="text-lg font-semibold mb-2">Archivos disponibles</h3>
        <p className="text-sm text-gray-600 mb-3">
          Por favor, revisa el material y envía tus comentarios.
        </p>

        {deliveryComments.map((comment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 mb-2"
          >
            <div>
              <span className="font-medium">Entrega #{index + 1}</span>
              <p className="text-sm text-gray-600">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            {comment.deliveryFileUrl ? (
              <a
                href={comment.deliveryFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm font-medium"
              >
                Descargar
              </a>
            ) : (
              <span className="text-gray-400 px-3 py-1 text-sm">
                Archivo no disponible
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Renderiza historial de comentarios
  const renderCommentHistory = (order) => {
    if (!order.comments || order.comments.length === 0) return null;

    // Filtrar para mostrar solo comentarios (no entregas)
    const comments = order.comments.filter((comment) => !comment.isDelivery);

    if (comments.length === 0) return null;

    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">
          Historial de comunicaciones
        </h3>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                comment.fromClient
                  ? "bg-blue-50 border border-blue-100 ml-6"
                  : "bg-gray-50 border border-gray-200 mr-6"
              }`}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {comment.fromClient ? "Tú" : "Administrador"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm">{comment.text}</p>

              {comment.attachmentNames &&
                comment.attachmentNames.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">
                      Archivos adjuntos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {comment.attachmentNames.map((name, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs bg-white rounded px-2 py-1 border border-gray-200"
                        >
                          <Paperclip size={12} className="mr-1 text-gray-500" />
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderiza formulario para enviar comentarios
  const renderCommentForm = () => {
    return (
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-3">Enviar mensaje</h3>

        {commentSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg flex items-center text-sm">
            <CheckCircle size={16} className="mr-2" />
            Mensaje enviado correctamente. Nos pondremos en contacto contigo
            pronto.
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tu comentario o consulta
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Escribe aquí tus comentarios, preguntas o solicitudes adicionales..."
              required
            ></textarea>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Archivos adjuntos (opcional)
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Upload size={14} className="mr-1" />
                Adjuntar archivo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                  >
                    <div className="flex items-center">
                      <File size={14} className="text-gray-500 mr-2" />
                      <span className="truncate max-w-xs">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !commentText.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Enviar mensaje
              </>
            )}
          </button>
        </form>
      </div>
    );
  };

  // Función para mostrar el estado del pedido en texto
  const getStatusText = (status) => {
    switch (status) {
      case "received":
        return "Recibido";
      case "in-progress":
        return "En Progreso";
      case "review":
        return "En Revisión";
      case "completed":
        return "Completado";
      default:
        return "Procesando";
    }
  };

  // Vista principal con formulario de búsqueda
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Seguimiento de Pedido
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Consulta el estado de tu proyecto ingresando el número de pedido que
            recibiste por correo electrónico
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Ej: WEB-2025-1001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Buscando...
                </>
              ) : (
                "Buscar Pedido"
              )}
            </button>
          </form>
        </div>

        {/* Muestra de pedidos de ejemplo */}
        {!orderFound && !loading && (
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertCircle size={18} className="text-blue-600 mr-2" />
              Ejemplos para probar
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Usa estos números de pedido de ejemplo para ver cómo funciona el
              sistema:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(sampleOrders).map(([number, description]) => (
                <div
                  key={number}
                  className="bg-white p-3 rounded border border-gray-200"
                >
                  <code className="font-mono text-sm">{number}</code>
                  <p className="text-xs text-gray-500 mt-1">{description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalles del pedido si se encontró */}
        {orderFound && orderDetails && (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      orderDetails.status === "in-progress"
                        ? "bg-amber-400"
                        : orderDetails.status === "review"
                        ? "bg-blue-500"
                        : orderDetails.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <h3 className="font-semibold text-lg">
                    Pedido #{orderNumber}
                  </h3>
                </div>
                <h2 className="text-2xl font-bold mt-1">
                  {orderDetails.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Cliente: {orderDetails.client}
                </p>
              </div>

              <div className="text-right">
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                    orderDetails.status === "in-progress"
                      ? "bg-amber-100 text-amber-800"
                      : orderDetails.status === "review"
                      ? "bg-blue-100 text-blue-800"
                      : orderDetails.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {getStatusText(orderDetails.status)}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Última actualización:{" "}
                  {orderDetails.lastUpdate && orderDetails.lastUpdate.toDate
                    ? orderDetails.lastUpdate.toDate().toLocaleDateString()
                    : new Date(orderDetails.lastUpdate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Línea de tiempo del proyecto */}
            {renderOrderSteps(orderDetails.steps)}

            {/* Archivos de entrega si están disponibles */}
            {renderDeliveryFiles(orderDetails)}

            {/* Historial de comentarios */}
            {renderCommentHistory(orderDetails)}

            {/* Formulario para enviar comentarios */}
            {renderCommentForm()}

            {/* Botón para contactar */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-4">
                ¿Necesitas ponerte en contacto directo? Puedes hacerlo por
                correo electrónico.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Ir a la página de contacto{" "}
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
