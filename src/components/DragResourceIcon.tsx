import {
  ResourceIcons,
  type Resource,
  type ResourceKey,
} from "../state/Resources";
import { useDraggableResource } from "./useDraggableResource";

interface ResourceIconProps {
  type: ResourceKey;
  resource: Resource;
  onDragOut?: (type: ResourceKey) => void;
}

export default function DragResourceIcon({
  type,
  resource,
  onDragOut,
}: ResourceIconProps) {
  const { ref, isDragging } = useDraggableResource(type, onDragOut);

  return (
    <button
      ref={ref}
      className={`w-18 flex flex-col items-center text-3xl p-2 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div>{ResourceIcons[type]}</div>
      <span className="text-xs text-gray-300 mt-1">
        {resource.amount} / {resource.max}
      </span>
    </button>
  );
}
