import i18next from "i18next";

// Función para obtener traducciones con fallback
const getTranslation = (key, defaultValue) => {
  // Intentar obtener la traducción usando el namespace sample-orders
  const translation = i18next.t(key, { ns: "sample-orders" });

  // Verificar si la traducción existe y no es la misma que la clave
  if (translation && translation !== key) {
    return translation;
  }

  // Devolver valor predeterminado si no se encuentra la traducción
  return defaultValue;
};

// Constantes con valores predeterminados en español
const DEFAULT_VALUES = {
  steps: {
    received: "Pedido Recibido",
    design: "Diseño",
    development: "Desarrollo",
    concept: "Concepto",
    production: "Producción",
    review: "Revisión",
    completed: "Finalizado",
  },
  comments: {
    web_welcome:
      "¡Bienvenido! Hemos recibido tu pedido y comenzaremos con el diseño.",
    web_client_question: "Gracias, ¿cuándo podré ver los primeros avances?",
    web_response: "Te presentaremos el diseño inicial en 5 días hábiles.",
    music_welcome: "Hemos recibido tu solicitud para el jingle publicitario.",
    music_delivery: "Primera versión del jingle lista para revisión",
    voiceover_welcome:
      "Hemos recibido tu solicitud para la locución comercial.",
  },
  titles: {
    web_corporate: "Sitio Web Corporativo",
    music_jingle: "Jingle Publicitario",
    music_voiceover: "Locución Comercial",
  },
  clients: {
    demo_company: "Empresa Demo",
    demo_brand: "Marca Demo",
    demo_radio: "Radio Demo",
  },
};

// Función para generar pedidos de ejemplo basados en el idioma actual
export const getSampleOrders = () => {
  return {
    "WEB-2025-1001": {
      orderNumber: "WEB-2025-1001",
      title: getTranslation(
        "titles.web_corporate",
        DEFAULT_VALUES.titles.web_corporate
      ),
      client: getTranslation(
        "clients.demo_company",
        DEFAULT_VALUES.clients.demo_company
      ),
      status: "in-progress",
      type: "web",
      currentStep: 2,
      steps: [
        {
          name: getTranslation("steps.received", DEFAULT_VALUES.steps.received),
          completed: true,
          date: "2025-01-15",
        },
        {
          name: getTranslation("steps.design", DEFAULT_VALUES.steps.design),
          completed: true,
          date: "2025-01-20",
        },
        {
          name: getTranslation(
            "steps.development",
            DEFAULT_VALUES.steps.development
          ),
          completed: false,
          currentStage: true,
        },
        {
          name: getTranslation("steps.review", DEFAULT_VALUES.steps.review),
          completed: false,
        },
        {
          name: getTranslation(
            "steps.completed",
            DEFAULT_VALUES.steps.completed
          ),
          completed: false,
        },
      ],
      comments: [
        {
          id: "1",
          text: getTranslation(
            "comments.web_welcome",
            DEFAULT_VALUES.comments.web_welcome
          ),
          fromClient: false,
          createdAt: "2025-01-15T10:00:00",
        },
        {
          id: "2",
          text: getTranslation(
            "comments.web_client_question",
            DEFAULT_VALUES.comments.web_client_question
          ),
          fromClient: true,
          createdAt: "2025-01-16T14:30:00",
        },
        {
          id: "3",
          text: getTranslation(
            "comments.web_response",
            DEFAULT_VALUES.comments.web_response
          ),
          fromClient: false,
          createdAt: "2025-01-16T15:00:00",
        },
      ],
      lastUpdate: new Date("2025-01-20"),
    },
    "MUSIC-2025-2001": {
      orderNumber: "MUSIC-2025-2001",
      title: getTranslation(
        "titles.music_jingle",
        DEFAULT_VALUES.titles.music_jingle
      ),
      client: getTranslation(
        "clients.demo_brand",
        DEFAULT_VALUES.clients.demo_brand
      ),
      status: "review",
      type: "music",
      currentStep: 3,
      steps: [
        {
          name: getTranslation("steps.received", DEFAULT_VALUES.steps.received),
          completed: true,
          date: "2025-02-01",
        },
        {
          name: getTranslation("steps.concept", DEFAULT_VALUES.steps.concept),
          completed: true,
          date: "2025-02-05",
        },
        {
          name: getTranslation(
            "steps.production",
            DEFAULT_VALUES.steps.production
          ),
          completed: true,
          date: "2025-02-10",
        },
        {
          name: getTranslation("steps.review", DEFAULT_VALUES.steps.review),
          completed: false,
          currentStage: true,
        },
        {
          name: getTranslation(
            "steps.completed",
            DEFAULT_VALUES.steps.completed
          ),
          completed: false,
        },
      ],
      comments: [
        {
          id: "1",
          text: getTranslation(
            "comments.music_welcome",
            DEFAULT_VALUES.comments.music_welcome
          ),
          fromClient: false,
          createdAt: "2025-02-01T09:00:00",
        },
        {
          id: "2",
          text: getTranslation(
            "comments.music_delivery",
            DEFAULT_VALUES.comments.music_delivery
          ),
          fromClient: false,
          createdAt: "2025-02-10T16:00:00",
          isDelivery: true,
          deliveryFileName: "jingle_v1.mp3",
          deliveryFileUrl: "#",
        },
      ],
      lastUpdate: new Date("2025-02-10"),
    },
    "MUSIC-2025-2002": {
      orderNumber: "MUSIC-2025-2002",
      title: getTranslation(
        "titles.music_voiceover",
        DEFAULT_VALUES.titles.music_voiceover
      ),
      client: getTranslation(
        "clients.demo_radio",
        DEFAULT_VALUES.clients.demo_radio
      ),
      status: "received",
      type: "music",
      currentStep: 1,
      steps: [
        {
          name: getTranslation("steps.received", DEFAULT_VALUES.steps.received),
          completed: true,
          date: "2025-02-15",
        },
        {
          name: getTranslation("steps.concept", DEFAULT_VALUES.steps.concept),
          completed: false,
          currentStage: true,
        },
        {
          name: getTranslation(
            "steps.production",
            DEFAULT_VALUES.steps.production
          ),
          completed: false,
        },
        {
          name: getTranslation("steps.review", DEFAULT_VALUES.steps.review),
          completed: false,
        },
        {
          name: getTranslation(
            "steps.completed",
            DEFAULT_VALUES.steps.completed
          ),
          completed: false,
        },
      ],
      comments: [
        {
          id: "1",
          text: getTranslation(
            "comments.voiceover_welcome",
            DEFAULT_VALUES.comments.voiceover_welcome
          ),
          fromClient: false,
          createdAt: "2025-02-15T09:00:00",
        },
      ],
      lastUpdate: new Date("2025-02-15"),
    },
  };
};

// Exportamos una función getter para obtener los pedidos de ejemplo
// Y una constante para la compatibilidad con el código existente
export const sampleOrders = getSampleOrders();
