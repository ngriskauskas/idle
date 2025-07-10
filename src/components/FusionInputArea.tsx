import { useDrop } from "react-dnd";
import { ResourceIcons, type ResourceKey } from "../state/Resources";
import { useEffect, useRef } from "react";

interface FusionInputAreaProps {
  selectedResources: ResourceKey[];
  onDrop: (type: ResourceKey) => void;
}

export function FusionInputArea({
  selectedResources,
  onDrop,
}: FusionInputAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "RESOURCE",
      drop: (item: { type: ResourceKey }) => {
        onDrop(item.type);
      },
      canDrop: () => selectedResources.length < 2,
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
      `}
    >
      {selectedResources.length === 0 ? (
        <span className="text-gray-400">Drop elements here</span>
      ) : (
        selectedResources.map((resc, idx) => (
          <div
            key={idx}
            className="text-4xl p-3 bg-gray-700 rounded border border-gray-500"
          >
            {ResourceIcons[resc]}
          </div>
        ))
      )}
    </div>
  );
}
