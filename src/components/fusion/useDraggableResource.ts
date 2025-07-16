import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";
import type { ResourceKey } from "../../state/resources/Resources";

export function useDraggableResource(
  type: ResourceKey,
  onDragOut?: (type: ResourceKey) => void
) {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RESOURCE",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (_, monitor) => {
      if (!monitor.didDrop() && onDragOut) {
        onDragOut(type);
      }
    },
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return { ref, isDragging };
}
