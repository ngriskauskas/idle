import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  TouchTransition,
  MultiBackend,
  Preview,
} from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  ResourceIcons,
  type ResourceKey,
} from "../../state/resources/Resources";

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

interface FusionDndProviderProps {
  children: React.ReactNode;
}

export default function FusionDndProvider({
  children,
}: FusionDndProviderProps) {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Preview>
        {(previewProps) => {
          const { item, style } = previewProps;
          const typedItem = item as { type: ResourceKey };
          return (
            <div
              style={{
                ...style,
                fontSize: "2rem",
                padding: "0.5rem",
                backgroundColor: "rgba(55, 65, 81, 0.9)",
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
      {children}
    </DndProvider>
  );
}
