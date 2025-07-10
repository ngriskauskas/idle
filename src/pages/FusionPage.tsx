import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResourceIcons, type ResourceKey } from "../state/Resources";
import { useGameState } from "../state/StateProvider";
import { FusionInputArea } from "../components/FusionInputArea";
import DragResourceIcon from "../components/DragResourceIcon";
import {
  TouchTransition,
  MultiBackend,
  Preview,
} from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export default function FusionPage() {
  const { resources } = useGameState();
  const [selectedResources, setSelectedResources] = useState<ResourceKey[]>([]);

  const handleDrop = (type: ResourceKey) => {
    if (selectedResources.length < 2) {
      setSelectedResources((prev) => [...prev, type]);
    }
  };

  const handleCombine = () => {
    if (selectedResources.length === 2) {
      alert(`Combining ${selectedResources[0]} + ${selectedResources[1]}!`);
      setSelectedResources([]);
    }
  };

  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
        transition: undefined,
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Preview>
        {(previewProps) => {
          const { item, style } = previewProps;
          const typedItem = item as { type: ResourceKey };
          // Optional: customize look based on `item.type`
          return (
            <div
              style={{
                ...style,
                fontSize: "2rem",
                padding: "0.5rem",
                backgroundColor: "rgba(55, 65, 81, 0.9)", // Tailwind gray-700ish
                borderRadius: "0.5rem",
                width: "3rem",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                color: "white",
              }}
            >
              {ResourceIcons[typedItem.type]}
            </div>
          );
        }}
      </Preview>
      <div className="text-white p-6 space-y-6 max-w-4xl mx-auto">
        <FusionInputArea
          selectedResources={selectedResources}
          onDrop={handleDrop}
        ></FusionInputArea>

        <button
          className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700 disabled:bg-gray-600 transition"
          disabled={selectedResources.length !== 2}
          onClick={handleCombine}
        >
          Combine
        </button>

        <div className="flex flex-wrap gap-4">
          {Object.entries(resources).map(([key, _]) => (
            <DragResourceIcon
              key={key}
              type={key as ResourceKey}
            ></DragResourceIcon>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
