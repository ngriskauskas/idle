import { useEffect, useState } from "react";
import { useGameState } from "../state/StateProvider";
import { FusionInputArea } from "../components/FusionInputArea";
import DragResourceIcon from "../components/DragResourceIcon";
import FusionDndProvider from "../components/FusionDndProvider";
import { ResourceIcons, type ResourceKey } from "../state/Resources";
import type { Fusion } from "../state/Fusions";
import FusionBar from "../components/FusionBar";

export default function FusionPage() {
  const { resources, fusions, doFusion } = useGameState();
  const [selectedResources, setSelectedResources] = useState<ResourceKey[]>([]);
  const [selectedFusion, setSelectedFusion] = useState<Fusion | undefined>();

  const handleDrop = (type: ResourceKey) => {
    if (selectedResources.length === 2) return;
    setSelectedResources((prev) => [...prev, type]);
  };

  const handleRemove = (type: ResourceKey) => {
    setSelectedResources((prev) => prev.filter((x) => x !== type));
    setSelectedFusion(undefined);
  };

  const handleCombine = () => {
    if (!selectedFusion) return;
    doFusion(selectedFusion);
    setSelectedResources([]);
  };

  useEffect(() => {
    if (selectedResources.length < 2) setSelectedFusion(undefined);
    else {
      const fusion = fusions.find((f) => {
        const inputs = f.recipe.input;
        return (
          inputs.includes(selectedResources[0]) &&
          inputs.includes(selectedResources[1])
        );
      });
      setSelectedFusion(fusion);
    }
  }, [selectedResources, fusions]);

  return (
    <FusionDndProvider>
      <div className="w-full max-w-4xl mx-auto px-4 py-6 text-white space-y-5">
        <FusionInputArea
          selectedResources={selectedResources}
          onDrop={handleDrop}
          onRemove={handleRemove}
          canAfford={selectedFusion?.canAfford}
        ></FusionInputArea>
        <div className="max-w-2xl ">
          {selectedFusion && <FusionBar fusion={selectedFusion} />}
        </div>
        <button
          className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700 disabled:bg-gray-600 transition"
          disabled={
            !selectedFusion ||
            !selectedFusion.canAfford ||
            selectedFusion.discovered
          }
          onClick={handleCombine}
        >
          Combine
        </button>
        <div className="flex flex-wrap gap-4">
          {Object.entries(resources).map(([key, resource]) => (
            <DragResourceIcon
              key={key}
              type={key as ResourceKey}
              resource={resource}
            ></DragResourceIcon>
          ))}
        </div>
        <div className="w-full flex justify-center mt-8">
          <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-4">
            <h2 className="text-white text-lg font-semibold text-center">
              All Fusions
            </h2>

            <div className="flex flex-col space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {fusions.map((fusion) => (
                <FusionBar key={fusion.key} fusion={fusion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FusionDndProvider>
  );
}
