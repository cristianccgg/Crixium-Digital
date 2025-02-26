import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  FilePen,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  FileDown,
  FileUp,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Paperclip,
  Loader,
  X,
  Upload,
  File,
} from "lucide-react";
import {
  getAllOrders,
  updateOrderStatus,
  addOrderComment,
  exportOrdersToJson,
  importOrdersFromJson,
  uploadOrderFiles,
} from "./OrderManagerFirebase";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ text: "", type: "" });
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const fileInputRef = useRef(null);
  const jsonFileInputRef = useRef(null);

  // Cargar todos los pedidos al iniciar
  useEffect(() => {
    loadOrders();
  }, []);

  // Filtrar los pedidos cuando cambian los criterios de búsqueda
  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, typeFilter]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const allOrders = await getAllOrders();
      console.log("Pedidos cargados:", allOrders); // Para depuración
      setOrders(allOrders);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      setUpdateMessage({
        text: "Error al cargar pedidos. Por favor, intenta de nuevo.",
        type: "error",
      });
    }
    setIsLoading(false);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filtrar por tipo
    if (typeFilter !== "all") {
      filtered = filtered.filter((order) => order.type === typeFilter);
    }

    // Ordenar por fecha de creación (más recientes primero)
    filtered.sort((a, b) => {
      const dateA =
        a.createdAt && a.createdAt.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
      const dateB =
        b.createdAt && b.createdAt.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
      return dateB - dateA;
    });

    setFilteredOrders(filtered);
  };

  // CAMBIO: Usar firebaseId en lugar de id
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setExpandedOrderId(order.firebaseId || order.id); // Compatibilidad con documentos antiguos
  };

  const handleStatusUpdate = async (order, newStatus, stepIndex) => {
    try {
      const result = await updateOrderStatus(
        order.orderNumber,
        newStatus,
        stepIndex
      );

      if (result.success) {
        // Actualizar la lista de pedidos
        await loadOrders();
        setSelectedOrder(result.order);

        // Mostrar mensaje de éxito
        setUpdateMessage({
          text: `Estado actualizado a: ${newStatus}`,
          type: "success",
        });

        setTimeout(() => setUpdateMessage({ text: "", type: "" }), 3000);
      } else {
        setUpdateMessage({
          text: result.message || "Error al actualizar el estado",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      setUpdateMessage({
        text: "Error al actualizar el estado del pedido",
        type: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (fileName) => {
    setAttachments((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedOrder) return;

    setIsUploading(true);

    try {
      const isDelivery = e.nativeEvent.submitter.name === "delivery";

      // Subir archivos si hay
      let deliveryFile = null;
      let attachmentNames = [];

      if (attachments.length > 0) {
        // Si es una entrega, usamos el primer archivo como archivo principal
        if (isDelivery) {
          deliveryFile = attachments[0];
        }

        // Subir todos los archivos
        const uploadResult = await uploadOrderFiles(
          selectedOrder.orderNumber,
          attachments,
          isDelivery ? "deliveries" : "comments"
        );

        if (uploadResult.success) {
          attachmentNames = uploadResult.fileNames;
        } else {
          throw new Error(uploadResult.message || "Error al subir archivos");
        }
      }

      console.log(
        "Enviando comentario para pedido:",
        selectedOrder.orderNumber
      );

      const result = await addOrderComment(
        selectedOrder.orderNumber,
        commentText,
        isDelivery,
        deliveryFile,
        false, // no es del cliente
        attachmentNames
      );

      if (result.success) {
        // Actualizar la lista de pedidos
        await loadOrders();

        // Limpiar el formulario
        setCommentText("");
        setAttachments([]);

        // Mostrar mensaje de éxito
        setUpdateMessage({
          text: isDelivery
            ? "Entrega registrada y notificada al cliente"
            : "Comentario agregado correctamente",
          type: "success",
        });

        setTimeout(() => setUpdateMessage({ text: "", type: "" }), 3000);
      } else {
        setUpdateMessage({
          text: result.message || "Error al agregar comentario",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      setUpdateMessage({
        text: "Error al procesar la solicitud: " + error.message,
        type: "error",
      });
    }

    setIsUploading(false);
  };

  const handleExportOrders = async () => {
    try {
      const result = await exportOrdersToJson();

      if (!result.success) {
        setUpdateMessage({
          text: result.message || "Error al exportar pedidos",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error al exportar pedidos:", error);
      setUpdateMessage({
        text: "Error al exportar pedidos: " + error.message,
        type: "error",
      });
    }
  };

  const handleClickImport = () => {
    jsonFileInputRef.current.click();
  };

  const handleImportOrders = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const result = await importOrdersFromJson(event.target.result);

          if (result.success) {
            await loadOrders();
            setUpdateMessage({
              text: result.message,
              type: "success",
            });
          } else {
            setUpdateMessage({
              text: result.message,
              type: "error",
            });
          }
        } catch (error) {
          console.error("Error al importar pedidos:", error);
          setUpdateMessage({
            text: "Error al procesar el archivo: " + error.message,
            type: "error",
          });
        }
        setIsUploading(false);
      };

      reader.onerror = () => {
        setUpdateMessage({
          text: "Error al leer el archivo",
          type: "error",
        });
        setIsUploading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("Error al manejar el archivo:", error);
      setUpdateMessage({
        text: "Error al procesar el archivo: " + error.message,
        type: "error",
      });
      setIsUploading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      received: { bg: "bg-gray-100", text: "text-gray-800", label: "Recibido" },
      "in-progress": {
        bg: "bg-amber-100",
        text: "text-amber-800",
        label: "En Progreso",
      },
      review: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "En Revisión",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completado",
      },
    };

    const config = statusConfig[status] || statusConfig.received;

    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Fecha no disponible";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }

    return new Date(timestamp).toLocaleDateString();
  };

  // CAMBIO: Usar firebaseId en lugar de id
  const renderOrderItem = (order) => {
    // Usar firebaseId para la expansión, con fallback a id para compatibilidad
    const orderId = order.firebaseId || order.id;
    const isExpanded = expandedOrderId === orderId;

    return (
      <div
        key={orderId}
        className={`mb-3 border rounded-lg ${
          isExpanded
            ? "border-blue-300 bg-blue-50"
            : "border-gray-200 hover:border-blue-200"
        }`}
      >
        <div
          className="p-4 cursor-pointer flex justify-between items-center"
          onClick={() => {
            handleOrderSelect(order);
          }}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-mono text-sm font-medium">
                {order.orderNumber}
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="mt-1">
              <h4 className="font-medium">{order.title}</h4>
              <p className="text-sm text-gray-600">
                {order.client} · {order.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(order.status)}
            {isExpanded ? (
              <ArrowDown size={16} className="text-blue-500" />
            ) : (
              <ArrowRight size={16} className="text-gray-400" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-200">
            <h4 className="font-medium mb-2">Progreso del pedido</h4>
            <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
              {order.steps.map((step, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 text-sm rounded-md flex items-center whitespace-nowrap
                    ${
                      step.completed
                        ? "bg-green-100 text-green-800"
                        : index === order.currentStep + 1
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(
                      order,
                      index === order.steps.length - 1
                        ? "completed"
                        : "in-progress",
                      index
                    );
                  }}
                >
                  {step.completed ? (
                    <CheckCircle size={14} className="mr-1" />
                  ) : (
                    <Clock size={14} className="mr-1" />
                  )}
                  {step.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-1">
                  Detalles del paquete
                </h5>
                <div className="p-3 bg-white rounded border border-gray-200 text-sm">
                  <p>
                    <span className="font-medium">Paquete:</span>{" "}
                    {order.details?.package?.title || "Personalizado"}
                  </p>
                  {order.details?.extras && order.details.extras.length > 0 && (
                    <p className="mt-1">
                      <span className="font-medium">Extras:</span>{" "}
                      {order.details.extras.join(", ")}
                    </p>
                  )}
                  <p className="mt-1">
                    <span className="font-medium">Total:</span> ${order.total}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-1">
                  Información del proyecto
                </h5>
                <div className="p-3 bg-white rounded border border-gray-200 text-sm h-32 overflow-y-auto">
                  {order.details?.siteType && (
                    <p>
                      <span className="font-medium">Tipo de sitio:</span>{" "}
                      {order.details.siteType}
                    </p>
                  )}
                  {order.details?.designReference && (
                    <p className="mt-1">
                      <span className="font-medium">Referencia de diseño:</span>{" "}
                      {order.details.designReference}
                    </p>
                  )}
                  {order.details?.projectDescription && (
                    <>
                      <p className="mt-1 font-medium">
                        Descripción del proyecto:
                      </p>
                      <p className="mt-0.5 text-gray-600">
                        {order.details.projectDescription}
                      </p>
                    </>
                  )}

                  {/* Mostrar archivos de referencia si existen */}
                  {order.details?.referenceFileUrls &&
                    order.details.referenceFileUrls.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium">Archivos de referencia:</p>
                        <div className="mt-1 space-y-1">
                          {order.details.referenceFileUrls.map((url, index) => (
                            <a
                              key={index}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:text-blue-800 text-xs"
                            >
                              {order.details.referenceFileNames?.[index] ||
                                `Archivo ${index + 1}`}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Formulario para actualizar estado o agregar comentarios */}
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-600 mb-2">
                Actualizar pedido
              </h5>
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Agregar un comentario o nota de entrega..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                ></textarea>

                {/* Sección para adjuntar archivos */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-gray-600">
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
                            <span className="truncate max-w-xs">
                              {file.name}
                            </span>
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

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isUploading || !commentText.trim()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <span className="flex items-center">
                        <Loader size={14} className="animate-spin mr-1" />
                        Enviando...
                      </span>
                    ) : (
                      "Agregar comentario"
                    )}
                  </button>
                  <button
                    type="submit"
                    name="delivery"
                    disabled={isUploading || !commentText.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <Loader size={14} className="animate-spin mr-1" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FilePen size={14} className="mr-1" /> Registrar entrega
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Historial de comentarios */}
            {order.comments && order.comments.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-600 mb-2">
                  Historial de comunicaciones
                </h5>
                <div className="space-y-2">
                  {[...order.comments]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((comment, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded text-sm ${
                          comment.fromClient
                            ? "bg-amber-50 border border-amber-200"
                            : comment.isDelivery
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                            {comment.fromClient && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-2">
                                Del cliente
                              </span>
                            )}
                            {comment.isDelivery && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2">
                                Entrega
                              </span>
                            )}
                          </div>
                        </div>
                        <p>{comment.text}</p>

                        {comment.attachmentNames &&
                          comment.attachmentNames.length > 0 && (
                            <div className="mt-2 bg-white p-2 rounded border border-gray-100">
                              <p className="text-xs text-gray-500 mb-1">
                                Archivos adjuntos:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {comment.attachmentNames.map((name, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center text-xs bg-gray-50 rounded px-2 py-1 border border-gray-200"
                                  >
                                    <Paperclip
                                      size={12}
                                      className="mr-1 text-gray-500"
                                    />
                                    {name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {comment.isDelivery && comment.deliveryFileUrl && (
                          <div className="mt-2">
                            <a
                              href={comment.deliveryFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded flex items-center w-fit hover:bg-blue-700"
                            >
                              <FileDown size={12} className="mr-1" />
                              Descargar entrega
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Gestiona y da seguimiento a los pedidos
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportOrders}
              disabled={isLoading || orders.length === 0}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <FileDown size={16} className="mr-1" /> Exportar
            </button>

            <button
              onClick={handleClickImport}
              disabled={isUploading}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader size={16} className="mr-1 animate-spin" />{" "}
                  Importando...
                </>
              ) : (
                <>
                  <FileUp size={16} className="mr-1" /> Importar
                </>
              )}
              <input
                ref={jsonFileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportOrders}
                disabled={isUploading}
              />
            </button>

            <button
              onClick={loadOrders}
              disabled={isLoading}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="mr-1 animate-spin" /> Cargando...
                </>
              ) : (
                <>
                  <RefreshCw size={16} className="mr-1" /> Actualizar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mensajes de alerta */}
        {updateMessage.text && (
          <div
            className={`mb-4 p-3 rounded-md flex items-center 
              ${
                updateMessage.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {updateMessage.type === "success" ? (
              <CheckSquare size={18} className="mr-2" />
            ) : (
              <AlertTriangle size={18} className="mr-2" />
            )}
            {updateMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Filtros y búsqueda */}
          <div className="md:col-span-1">
            <div className="bg-white p-5 rounded-xl shadow-sm sticky top-4">
              <h2 className="text-lg font-medium mb-4">Filtros</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Número o cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="received">Recibidos</option>
                  <option value="in-progress">En progreso</option>
                  <option value="review">En revisión</option>
                  <option value="completed">Completados</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Todos los tipos</option>
                  <option value="jingle">Jingles</option>
                  <option value="web">Web</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">
                  {filteredOrders.length} pedidos encontrados
                </p>
              </div>
            </div>
          </div>

          {/* Lista de pedidos */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-medium mb-4">Pedidos</h2>

              {isLoading ? (
                <div className="text-center py-10">
                  <Loader
                    size={30}
                    className="animate-spin mx-auto mb-4 text-blue-600"
                  />
                  <p className="text-gray-500">Cargando pedidos...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No se encontraron pedidos con los filtros seleccionados
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredOrders.map(renderOrderItem)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
