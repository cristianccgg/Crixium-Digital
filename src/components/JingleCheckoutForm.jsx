import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Music,
  Mic,
  FileMusic,
  Check,
  Package,
  Upload,
  File,
  X,
  Loader,
} from "lucide-react";
import { createOrder } from "./OrderManagerFirebase"; // Importar la versión Firebase

const JingleCheckoutForm = ({ selectedPackage, onCancel }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [currentTotal, setCurrentTotal] = useState(
    parseInt(selectedPackage.price || 0)
  );
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Package details
    package: selectedPackage.id,
    packageDetails: selectedPackage,
    extras: [],
    // Project details
    voiceType: "",
    reference: "",
    briefing: "",
    referenceFiles: [],
    // Contact info
    name: "",
    email: "",
    total: parseInt(selectedPackage.price || 0),
  });

  const fileInputRef = useRef(null);

  // Actualizar el total cuando cambian los extras
  useEffect(() => {
    const newTotal = calculateTotal();
    setCurrentTotal(newTotal);

    setFormData((prev) => ({
      ...prev,
      total: newTotal,
    }));
  }, [formData.extras]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      referenceFiles: [...prev.referenceFiles, ...files],
    }));
  };

  const removeFile = (fileName) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter(
        (file) => file.name !== fileName
      ),
    }));
  };

  // Manejadores de cambio para los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const extraServices = [
    {
      id: "rush",
      title: "Entrega Express",
      price: 15,
      description: "Entrega en 48 horas o menos (sujeto a disponibilidad)",
    },
    {
      id: "instrumental",
      title: "Instrumental Track",
      price: 15,
      description: "Versión instrumental del jingle - karaoke",
    },
    {
      id: "vocals",
      title: "Only Vocals Track",
      price: 15,
      description: "Todas las voces juntas en una sola pista",
    },
    {
      id: "duet",
      title: "Male/Female Vocals Together",
      price: 25,
      description:
        "Tu jingle grabado con voces masculina y femenina profesionales",
    },
    {
      id: "stems",
      title: "Stems",
      price: 25,
      description: "Entrega de cada pista por separado",
    },
  ];

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPackage.price || 0);
    const extrasTotal = formData.extras.reduce((total, extraId) => {
      const extra = extraServices.find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return basePrice + extrasTotal;
  };

  const handleExtraToggle = (extraId) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id) => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  const handleVoiceSelect = (voice) => {
    setFormData((prev) => ({
      ...prev,
      voiceType: voice,
    }));
  };

  const SelectedPackageDisplay = () => (
    <div className="mb-8 p-4 bg-purple-50 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="text-purple-700" size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{selectedPackage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {selectedPackage.delivery}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-purple-700 font-semibold">
              US${selectedPackage.price}
            </span>
            <span className="text-sm text-gray-500">precio base</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={`w-12 h-1 ${
                step > num ? "bg-purple-700" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Componentes de pasos
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Personaliza tu Paquete</h3>
      <div className="space-y-4">
        {extraServices.map((extra) => (
          <div
            key={extra.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.extras.includes(extra.id)
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handleExtraToggle(extra.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.extras.includes(extra.id)
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-300"
                  }`}
                >
                  {formData.extras.includes(extra.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{extra.title}</h4>
                  <p className="text-sm text-gray-500">{extra.description}</p>
                </div>
              </div>
              <span className="font-medium">+${extra.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total Estimado:</span>
          <span className="text-xl font-bold">${currentTotal}</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Detalles del Jingle</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Voz
          </label>
          <div className="grid grid-cols-2 gap-4">
            {["Masculina", "Femenina"].map((voice) => (
              <button
                key={voice}
                type="button"
                onClick={() => handleVoiceSelect(voice)}
                className={`p-4 border rounded-lg flex items-center gap-2 ${
                  formData.voiceType === voice
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <Mic size={20} />
                <span>Voz {voice}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Tienes alguna referencia musical?
          </label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            placeholder="Ej: Estilo similar a..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brief Creativo
          </label>
          <textarea
            name="briefing"
            value={formData.briefing}
            onChange={handleInputChange}
            rows={4}
            placeholder="Describe tu marca, el mensaje principal que quieres transmitir, y cualquier idea específica que tengas para el jingle..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referencias o Documentos
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Adjunta letras, referencias o detalles relevantes para crear un
              Jingle perfecto
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-500">
                  Haz clic para subir archivos o arrastra aquí
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOC, TXT, MP3 (máx 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.mp3"
                />
              </div>

              {formData.referenceFiles.length > 0 && (
                <div className="mt-3 space-y-3">
                  {formData.referenceFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <File size={16} className="text-gray-500" />
                        <span className="text-sm truncate max-w-xs">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-medium mb-2">Resumen del Pedido</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Paquete Base</span>
            <span>
              $
              {currentTotal -
                formData.extras.reduce((total, extraId) => {
                  const extra = extraServices.find((e) => e.id === extraId);
                  return total + (extra?.price || 0);
                }, 0)}
            </span>
          </li>
          {formData.extras.map((extraId) => {
            const extra = extraServices.find((e) => e.id === extraId);
            return (
              <li key={extraId} className="flex justify-between text-gray-600">
                <span>{extra.title}</span>
                <span>+${extra.price}</span>
              </li>
            );
          })}
          <li className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${currentTotal}</span>
          </li>
        </ul>
      </div>
    </div>
  );

  // Componente para mostrar la confirmación del pedido
  const OrderConfirmation = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h2>
      <p className="text-gray-600 mb-6">
        Tu pedido ha sido recibido. Hemos enviado los detalles a tu correo.
      </p>
      <div className="p-4 bg-purple-50 rounded-lg inline-block mb-6">
        <p className="text-sm text-gray-700 mb-1">Tu número de pedido es:</p>
        <p className="text-xl font-mono font-bold">{orderNumber}</p>
      </div>
      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <button
          onClick={() => navigate(`/tracking?order=${orderNumber}`)}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-coral-400 transition-colors"
        >
          Seguir mi Pedido
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 px-6 py-2 hover:text-purple-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (formData.voiceType === "" && step === 2) {
      setError("Por favor, selecciona un tipo de voz");
      setIsSubmitting(false);
      return;
    }

    if (step === 3 && (!formData.name.trim() || !formData.email.trim())) {
      setError("Por favor, completa todos los campos requeridos");
      setIsSubmitting(false);
      return;
    }

    try {
      // En el paso 3, enviamos el formulario
      if (step === 3) {
        // SOLUCIÓN: Creamos un nuevo objeto para enviar, con las propiedades type y category explícitas
        const enhancedFormData = {
          ...formData,
          packageDetails: {
            ...formData.packageDetails,
            type: "music", // CLAVE: Establecer explícitamente para forzar MUSIC-
            category: "jingle", // CLAVE: Establecer explícitamente para forzar MUSIC-
          },
        };

        // Utilizar la versión Firebase para crear el pedido con el objeto mejorado
        const result = await createOrder(enhancedFormData);

        if (result.success) {
          setOrderNumber(result.orderNumber);
          setOrderComplete(true);

          // En un entorno real, aquí enviarías un correo electrónico al cliente
          console.log(
            `Email would be sent to ${formData.email} with order number ${result.orderNumber}`
          );
        } else {
          setError(
            result.message ||
              "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
          );
        }
      } else {
        // Si no estamos en el paso final, simplemente avanzamos al siguiente paso
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      setError(
        "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
      );
    }

    setIsSubmitting(false);
  };

  // Si el pedido está completo, mostrar la confirmación
  if (orderComplete) {
    return <OrderConfirmation />;
  }

  // Renderizar el paso actual
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SelectedPackageDisplay />
      <StepIndicator />

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderCurrentStep()}

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Anterior
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-coral-400 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Procesando...
              </>
            ) : step < 3 ? (
              "Siguiente"
            ) : (
              "Realizar Pedido"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JingleCheckoutForm;
