import React, { useState, useRef } from "react";
import {
  Music,
  Mic,
  FileMusic,
  Check,
  Package,
  Upload,
  File,
} from "lucide-react";

const VoiceoverCheckoutForm = ({ selectedPackage, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    package: selectedPackage.id,
    packageDetails: selectedPackage,
    extras: [],
    voiceType: "",
    script: "",
    musicStyle: "",
    referenceFiles: [], // Add this line
    name: "",
    email: "",
  });

  const fileInputRef = useRef(null);

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

  const extraServices = [
    {
      id: "rush",
      title: "Entrega Express",
      price: 15,
      description: "Entrega en 48 horas (sujeto a disponibilidad)",
    },
    {
      id: "sfx",
      title: "Efectos de sonido premium",
      price: 20,
      description: "Biblioteca completa de efectos profesionales",
    },
  ];

  const musicStyles = [
    "Corporativa/Profesional",
    "Energética/Motivacional",
    "Relajante/Zen",
    "Tecnológica/Moderna",
    "Sin música",
  ];

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPackage.price);
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

  const SelectedPackageDisplay = () => (
    <div className="mb-8 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{selectedPackage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Hasta {selectedPackage.wordCount} palabras |{" "}
            {selectedPackage.delivery}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">
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
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={`w-12 h-1 ${
                step > num ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const Step1_Extras = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Personaliza tu Paquete</h3>
      <div className="space-y-4">
        {extraServices.map((extra) => (
          <div
            key={extra.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.extras.includes(extra.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleExtraToggle(extra.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.extras.includes(extra.id)
                      ? "border-blue-500 bg-blue-500"
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
          <span className="text-xl font-bold">${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );

  const Step2_Details = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Detalles de la Locución</h3>
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
                onClick={() =>
                  setFormData((prev) => ({ ...prev, voiceType: voice }))
                }
                className={`p-4 border rounded-lg flex items-center gap-2 ${
                  formData.voiceType === voice
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-300"
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
            Estilo de Música de Fondo
          </label>
          <div className="grid grid-cols-2 gap-4">
            {musicStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, musicStyle: style }))
                }
                className={`p-4 border rounded-lg flex items-center gap-2 ${
                  formData.musicStyle === style
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <Music size={20} />
                <span>{style}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guión / Texto a locutar
          </label>
          <textarea
            value={formData.script}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, script: e.target.value }))
            }
            rows={6}
            placeholder="Ingresa el texto que deseas que sea locutado..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Cantidad máxima de palabras: {selectedPackage.wordCount}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referencias o Archivos Adicionales
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Adjunta ejemplos o información relevante para tu locución
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
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
                        Eliminar
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

  const Step3_Contact = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Resumen del Pedido</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Paquete Base ({selectedPackage.wordCount} palabras)</span>
            <span>${selectedPackage.price}</span>
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
            <span>${calculateTotal()}</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SelectedPackageDisplay />
      <StepIndicator />

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && <Step1_Extras />}
        {step === 2 && <Step2_Details />}
        {step === 3 && <Step3_Contact />}

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Realizar Pedido
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VoiceoverCheckoutForm;
