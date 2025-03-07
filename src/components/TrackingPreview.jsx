import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const TrackingPreview = () => {
  const { t } = useTranslation("tracking-preview");
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  // Demo order data
  const demoOrder = {
    number: "ORD12345",
    title: "Página Web Corporativa",
    client: "Empresa Ejemplo",
    status: "in-progress",
    steps: [
      {
        name: "Recepción y Planificación",
        completed: true,
        date: "15/01/2025",
      },
      { name: "Diseño y Prototipo", completed: true, date: "30/01/2025" },
      { name: "Desarrollo Frontend", currentStage: true, date: "En curso" },
      { name: "Desarrollo Backend", completed: false },
      { name: "Pruebas y Ajustes", completed: false },
      { name: "Entrega Final", completed: false },
    ],
  };

  // Animación automática que avanza por los pasos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoOrder.steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-md w-full h-[420px] mx-auto">
      {/* Cabecera del tracker */}
      <div className="bg-purple-700 text-white p-4">
        <div className="flex items-center mb-2">
          <Package size={18} className="mr-2" />
          <span className="text-sm font-medium">
            {t("pedido")} #{demoOrder.number}
          </span>
        </div>
        <h3 className="text-xl font-bold">{demoOrder.title}</h3>
        <p className="text-sm text-purple-100">
          {t("client")}: {demoOrder.client}
        </p>
      </div>

      {/* Timeline demo */}
      <div className="p-6">
        <h4 className="font-semibold mb-4">{t("progreso")}</h4>
        <div className="relative">
          {demoOrder.steps.map((step, index) => (
            <div
              key={index}
              className={`flex mb-6 relative transition-all duration-300 ${
                activeStep === index ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* Línea conectora */}
              {index < demoOrder.steps.length - 1 && (
                <div
                  className={`absolute left-5 top-6 w-0.5 h-full ${
                    step.completed ? "bg-purple-700" : "bg-gray-200"
                  }`}
                ></div>
              )}

              {/* Círculo de estado */}
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  step.currentStage
                    ? "bg-purple-100 border-2 border-purple-700"
                    : step.completed
                    ? "bg-purple-700"
                    : "bg-gray-200"
                }`}
              >
                {step.completed ? (
                  <CheckCircle size={20} className="text-white" />
                ) : step.currentStage ? (
                  <Clock size={20} className="text-purple-700" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                )}
              </div>

              {/* Información del paso */}
              <div>
                <div className="flex items-center">
                  <h4
                    className={`font-medium ${
                      step.currentStage ? "text-purple-700" : "text-gray-800"
                    }`}
                  >
                    {step.name}
                  </h4>
                  {step.currentStage && (
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
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

      {/* Footer con CTA */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <button
          onClick={() => navigate("/order-tracking")}
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-coral-400 transition-colors flex items-center justify-center"
        >
          <span>Ver seguimiento completo</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TrackingPreview;
