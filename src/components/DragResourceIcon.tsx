import { useDrag } from "react-dnd";
import { ResourceIcons, type ResourceKey } from "../state/Resources";
import { useEffect, useRef } from "react";

interface ResourceIconProps {
  type: ResourceKey;
}

export default function DragResourceIcon({ type }: ResourceIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RESOURCE",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <button
      ref={ref}
      className={`text-3xl p-2 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {ResourceIcons[type]}
    </button>
  );
}
