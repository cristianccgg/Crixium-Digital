export const sampleOrders = {
  "WEB-2025-1001": {
    orderNumber: "WEB-2025-1001",
    title: "Sitio Web Corporativo",
    client: "Empresa Demo",
    status: "in-progress",
    type: "web",
    currentStep: 2,
    steps: [
      {
        name: "Pedido Recibido",
        completed: true,
        date: "2025-01-15",
      },
      {
        name: "Diseño",
        completed: true,
        date: "2025-01-20",
      },
      {
        name: "Desarrollo",
        completed: false,
        currentStage: true,
      },
      {
        name: "Revisión",
        completed: false,
      },
      {
        name: "Finalizado",
        completed: false,
      },
    ],
    comments: [
      {
        id: "1",
        text: "¡Bienvenido! Hemos recibido tu pedido y comenzaremos con el diseño.",
        fromClient: false,
        createdAt: "2025-01-15T10:00:00",
      },
      {
        id: "2",
        text: "Gracias, ¿cuándo podré ver los primeros avances?",
        fromClient: true,
        createdAt: "2025-01-16T14:30:00",
      },
      {
        id: "3",
        text: "Te presentaremos el diseño inicial en 5 días hábiles.",
        fromClient: false,
        createdAt: "2025-01-16T15:00:00",
      },
    ],
    lastUpdate: new Date("2025-01-20"),
  },
  "MUSIC-2025-2001": {
    orderNumber: "MUSIC-2025-2001",
    title: "Jingle Publicitario",
    client: "Marca Demo",
    status: "review",
    type: "music",
    currentStep: 3,
    steps: [
      {
        name: "Pedido Recibido",
        completed: true,
        date: "2025-02-01",
      },
      {
        name: "Concepto",
        completed: true,
        date: "2025-02-05",
      },
      {
        name: "Producción",
        completed: true,
        date: "2025-02-10",
      },
      {
        name: "Revisión",
        completed: false,
        currentStage: true,
      },
      {
        name: "Finalizado",
        completed: false,
      },
    ],
    comments: [
      {
        id: "1",
        text: "Hemos recibido tu solicitud para el jingle publicitario.",
        fromClient: false,
        createdAt: "2025-02-01T09:00:00",
      },
      {
        id: "2",
        text: "Primera versión del jingle lista para revisión",
        fromClient: false,
        createdAt: "2025-02-10T16:00:00",
        isDelivery: true,
        deliveryFileName: "jingle_v1.mp3",
        deliveryFileUrl: "#",
      },
    ],
    lastUpdate: new Date("2025-02-10"),
  },
};
