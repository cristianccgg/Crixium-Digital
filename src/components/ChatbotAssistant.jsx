import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  MinusSquare,
  Send,
  Music2,
  Globe,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content:
        "👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Opciones rápidas iniciales
  const [quickOptions, setQuickOptions] = useState([
    { id: "web", label: "Desarrollo Web", icon: Globe },
    { id: "music", label: "Producción Musical", icon: Music2 },
    { id: "pricing", label: "Ver Precios", icon: ShoppingCart },
  ]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Añadir mensaje del usuario
    const newUserMessage = {
      sender: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");
    setTyping(true);

    // Procesar entrada del usuario y generar respuesta
    setTimeout(() => {
      const botResponse = generateResponse(userInput);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setTyping(false);
    }, 1000);
  };

  // Función para manejar opciones rápidas
  const handleQuickOption = (optionId) => {
    let newMessage;
    let options = [];

    switch (optionId) {
      case "web":
        newMessage = {
          sender: "user",
          content: "Me interesa el desarrollo web",
          timestamp: new Date(),
        };
        options = [
          { id: "web-wordpress", label: "WordPress", icon: Globe },
          { id: "web-custom", label: "Custom Code", icon: Globe },
          { id: "web-ecommerce", label: "Tienda Online", icon: ShoppingCart },
        ];
        break;
      case "music":
        newMessage = {
          sender: "user",
          content: "Me interesa la producción musical",
          timestamp: new Date(),
        };
        options = [
          { id: "music-jingles", label: "Jingles", icon: Music2 },
          { id: "music-voiceover", label: "Locución", icon: Music2 },
          { id: "music-custom", label: "Proyecto Personalizado", icon: Music2 },
        ];
        break;
      case "pricing":
        newMessage = {
          sender: "user",
          content: "Quiero ver los precios",
          timestamp: new Date(),
        };
        options = [
          { id: "price-web", label: "Precios Web", icon: Globe },
          {
            id: "price-ecommerce",
            label: "Precios E-commerce",
            icon: ShoppingCart,
          },
          { id: "price-music", label: "Precios Música", icon: Music2 },
        ];
        break;
      case "web-wordpress":
      case "web-custom":
        newMessage = {
          sender: "user",
          content: `Me interesa ${
            optionId === "web-wordpress"
              ? "WordPress"
              : "desarrollo personalizado"
          }`,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setTimeout(() => {
          const response = {
            sender: "bot",
            content: `¡Perfecto! Tenemos diferentes planes para ${
              optionId === "web-wordpress"
                ? "WordPress"
                : "desarrollo personalizado"
            }. ¿Te gustaría ver nuestros paquetes o prefieres una cotización personalizada?`,
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, response]);

          setQuickOptions([
            { id: "view-plans", label: "Ver Planes", icon: ShoppingCart },
            {
              id: "custom-quote",
              label: "Cotización Personalizada",
              icon: Globe,
            },
          ]);
        }, 1000);
        return;
      case "web-ecommerce":
        newMessage = {
          sender: "user",
          content: "Me interesa una tienda online",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setTimeout(() => {
          const response = {
            sender: "bot",
            content:
              "¡Genial! Tenemos soluciones e-commerce especializadas. ¿Te gustaría ver nuestros paquetes o deseas una cotización personalizada?",
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, response]);

          setQuickOptions([
            { id: "view-ecommerce", label: "Ver Planes", icon: ShoppingCart },
            {
              id: "custom-quote",
              label: "Cotización Personalizada",
              icon: Globe,
            },
          ]);
        }, 1000);
        return;
      case "music-jingles":
      case "music-voiceover":
        newMessage = {
          sender: "user",
          content: `Me interesan ${
            optionId === "music-jingles"
              ? "los jingles"
              : "los servicios de locución"
          }`,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setTimeout(() => {
          const response = {
            sender: "bot",
            content: `¡Excelente elección! Tenemos diferentes paquetes de ${
              optionId === "music-jingles"
                ? "jingles publicitarios"
                : "locución profesional"
            }. ¿Te gustaría ver nuestros planes?`,
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, response]);

          setQuickOptions([
            {
              id:
                optionId === "music-jingles"
                  ? "view-jingles"
                  : "view-voiceover",
              label: "Ver Planes",
              icon: Music2,
            },
            {
              id: "custom-quote",
              label: "Cotización Personalizada",
              icon: Music2,
            },
          ]);
        }, 1000);
        return;
      case "music-custom":
        navigateToContact("music", "Proyecto Personalizado");
        return;
      case "view-plans":
        navigateToWebPricing();
        return;
      case "view-ecommerce":
        navigateToEcommercePricing();
        return;
      case "view-jingles":
      case "view-voiceover":
        navigateToMusicPricing(
          optionId === "view-jingles" ? "jingles" : "voiceover"
        );
        return;
      case "price-web":
        navigateToWebPricing();
        return;
      case "price-ecommerce":
        navigateToEcommercePricing();
        return;
      case "price-music":
        navigateToMusicPricing();
        return;
      case "custom-quote":
        navigateToContact();
        return;
      default:
        return;
    }

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setTimeout(() => {
      let response;
      if (optionId === "web") {
        response = {
          sender: "bot",
          content:
            "¡Genial! Ofrecemos servicios de desarrollo web con WordPress, desarrollo personalizado y tiendas online. ¿Qué te interesa más?",
          timestamp: new Date(),
        };
      } else if (optionId === "music") {
        response = {
          sender: "bot",
          content:
            "Ofrecemos servicios de producción musical como jingles publicitarios, locución profesional y proyectos personalizados. ¿Cuál te interesa?",
          timestamp: new Date(),
        };
      } else if (optionId === "pricing") {
        response = {
          sender: "bot",
          content: "¿Qué tipo de precios te gustaría consultar?",
          timestamp: new Date(),
        };
      }

      setMessages((prevMessages) => [...prevMessages, response]);
      setQuickOptions(options);
    }, 1000);
  };

  // Funciones de navegación
  const navigateToWebPricing = () => {
    navigate("/web-development");
    addBotMessage(
      "Te he redirigido a nuestra página de desarrollo web donde podrás ver todos nuestros planes disponibles."
    );
    resetQuickOptions();
  };

  const navigateToEcommercePricing = () => {
    navigate("/web-development");
    addBotMessage(
      "Te he redirigido a nuestra página de desarrollo web donde podrás encontrar la sección de tiendas online."
    );
    resetQuickOptions();
  };

  const navigateToMusicPricing = (service) => {
    navigate("/music-production");
    addBotMessage(
      `Te he redirigido a nuestra página de producción musical donde podrás ver todos${
        service
          ? ` nuestros planes de ${
              service === "jingles" ? "jingles" : "locución"
            }`
          : " nuestros servicios"
      }.`
    );
    resetQuickOptions();
  };

  const navigateToContact = (service, projectType) => {
    navigate("/contact", {
      state: {
        initialService: service || "",
        projectType: projectType || "",
      },
    });
    addBotMessage(
      "Te he redirigido a nuestro formulario de contacto para que puedas solicitar una cotización personalizada."
    );
    resetQuickOptions();
  };

  const addBotMessage = (content) => {
    const botMessage = {
      sender: "bot",
      content,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const resetQuickOptions = () => {
    setQuickOptions([
      { id: "web", label: "Desarrollo Web", icon: Globe },
      { id: "music", label: "Producción Musical", icon: Music2 },
      { id: "pricing", label: "Ver Precios", icon: ShoppingCart },
    ]);
  };

  // Generar respuesta del bot basada en la entrada del usuario
  const generateResponse = (input) => {
    input = input.toLowerCase();

    if (
      input.includes("precio") ||
      input.includes("costo") ||
      input.includes("tarifa") ||
      input.includes("cuanto")
    ) {
      return {
        sender: "bot",
        content: "¿Qué tipo de precios te gustaría consultar?",
        timestamp: new Date(),
      };
    } else if (
      input.includes("web") ||
      input.includes("pagina") ||
      input.includes("sitio") ||
      input.includes("tienda") ||
      input.includes("wordpress")
    ) {
      setTimeout(() => {
        setQuickOptions([
          { id: "web-wordpress", label: "WordPress", icon: Globe },
          { id: "web-custom", label: "Custom Code", icon: Globe },
          { id: "web-ecommerce", label: "Tienda Online", icon: ShoppingCart },
        ]);
      }, 100);

      return {
        sender: "bot",
        content:
          "¡Genial! Ofrecemos servicios de desarrollo web con WordPress, desarrollo personalizado y tiendas online. ¿Qué te interesa más?",
        timestamp: new Date(),
      };
    } else if (
      input.includes("musica") ||
      input.includes("jingle") ||
      input.includes("audio") ||
      input.includes("locucion") ||
      input.includes("sonido")
    ) {
      setTimeout(() => {
        setQuickOptions([
          { id: "music-jingles", label: "Jingles", icon: Music2 },
          { id: "music-voiceover", label: "Locución", icon: Music2 },
          { id: "music-custom", label: "Proyecto Personalizado", icon: Music2 },
        ]);
      }, 100);

      return {
        sender: "bot",
        content:
          "Ofrecemos servicios de producción musical como jingles publicitarios, locución profesional y proyectos personalizados. ¿Cuál te interesa?",
        timestamp: new Date(),
      };
    } else if (
      input.includes("contacto") ||
      input.includes("cotizacion") ||
      input.includes("personalizado")
    ) {
      return {
        sender: "bot",
        content:
          "Para solicitar una cotización personalizada, te puedo redirigir a nuestro formulario de contacto. Allí podrás detallar tu proyecto y necesidades específicas.",
        timestamp: new Date(),
      };
    } else {
      return {
        sender: "bot",
        content:
          "Puedo ayudarte con información sobre nuestros servicios de desarrollo web y producción musical. ¿Qué te gustaría saber?",
        timestamp: new Date(),
      };
    }
  };

  // Renderizado condicional basado en el estado
  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-coral-500 transition-colors z-50"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-xl z-50 flex flex-col transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[500px]"
      }`}
    >
      {/* Chatbot Header */}
      <div className="bg-purple-700 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h3 className="font-medium">Asistente Virtual</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={minimizeChat}
            className="text-white/80 hover:text-white"
          >
            <MinusSquare size={18} />
          </button>
          <button
            onClick={toggleChat}
            className="text-white/80 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Chatbot Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-purple-700 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 block text-right mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 p-3 rounded-lg border border-gray-200 rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Options */}
          {quickOptions.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleQuickOption(option.id)}
                      className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-sm font-medium hover:bg-coral-300/50 transition-colors flex items-center gap-1.5"
                    >
                      <Icon size={14} />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-200 flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-purple-700 text-white p-2 rounded-md hover:bg-coral-600"
            >
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatbotAssistant;
