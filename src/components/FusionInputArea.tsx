import { useDrop } from "react-dnd";
import { type ResourceKey } from "../state/Resources";
import { useEffect, useRef } from "react";
import DragResourceIcon from "./DragResourceIcon";
import { useGameState } from "../state/StateProvider";

interface FusionInputAreaProps {
  selectedResources: ResourceKey[];
  onDrop: (type: ResourceKey) => void;
  onRemove: (type: ResourceKey) => void;
  canAfford?: boolean;
}

export function FusionInputArea({
  selectedResources,
  onDrop,
  onRemove,
  canAfford,
}: FusionInputAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resources } = useGameState();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "RESOURCE",
      drop: (item: { type: ResourceKey }) => {
        onDrop(item.type);
      },
      canDrop: (item: { type: ResourceKey }) =>
        selectedResources.length < 2 && !selectedResources.includes(item.type),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [selectedResources]
  );

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div
      ref={ref}
      className={`min-h-[120px] border rounded p-4 flex items-center justify-center gap-4
        ${
          isOver && canDrop
            ? "bg-indigo-800 border-indigo-500"
            : "bg-gray-800 border-gray-700"
        }
        ${
          canAfford === true
            ? "outline-4 outline-green-500"
            : canAfford === false
            ? "outline-4 outline-red-500"
            : ""
        }
      `}
    >
      {selectedResources.length === 0 ? (
        <span className="text-gray-400">Drop elements here</span>
      ) : (
        selectedResources.map((resc) => (
          <DragResourceIcon
            key={resc}
            type={resc}
            onDragOut={onRemove}
            resource={resources[resc]!}
          />
        ))
      )}
    </div>
  );
}
