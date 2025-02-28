import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const HeroAnimation = () => {
  const { RiveComponent, rive } = useRive({
    src: "/animaciones/hero.riv",
    autoplay: true,
    stateMachines: "State Machine 1", // Ajusta esto al nombre correcto de tu state machine si lo usas
    onLoad: () => console.log("Animación cargada con éxito"),
    onError: (e) => console.error("Error cargando la animación:", e),
  });

  return (
    <div className="w-full h-[800px]">
      <RiveComponent />
    </div>
  );
};

export default HeroAnimation;
