import { useGameState } from "../state/GameState";
import {
  ResourceIcons,
  StartingResourceOptions,
  type Resource,
} from "../state/resources/Resources";

export const StartingResourcePicker = () => {
  const addResouce = useGameState((s) => s.resources.add);
  const resourceDisplay = (resource: Resource) => (
    <button
      className="inline-flex items-center px-3 py-2 rounded hover:brightness-90 transition cursor-pointer"
      style={{ backgroundColor: resource.color, color: resource.textColor }}
      onClick={() => addResouce(resource)}
    >
      <span className="mr-1 md:text-lg">{ResourceIcons[resource.key]}</span>
      <span>{resource.key}</span>
    </button>
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Pick your starting resource
        </h2>
        <div className="flex justify-around">
          {resourceDisplay(StartingResourceOptions.earth!)}
          {resourceDisplay(StartingResourceOptions.fire!)}
          {resourceDisplay(StartingResourceOptions.water!)}
          {resourceDisplay(StartingResourceOptions.air!)}
        </div>
      </div>
    </div>
  );
};
