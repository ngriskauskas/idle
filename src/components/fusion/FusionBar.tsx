import type { Fusion } from "../../state/fusions/Fusions";
import {
  ResourceIcons,
  type ResourceKey,
} from "../../state/resources/Resources";
import { ResourceCostDisplay } from "../resource/ResourceCostDisplay";

export default function FusionBar({ fusion }: { fusion: Fusion }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between text-white text-sm gap-2">
      {fusion.discovered ? (
        <div
          className="flex items-center space-x-2 px-2 py-1 rounded"
          style={{ backgroundColor: fusion.recipe.output.color }}
        >
          <span className="text-xl">
            {ResourceIcons[fusion.recipe.output.key as ResourceKey]}
          </span>
          <span className="font-medium">{fusion.recipe.output.key}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2 bg-gray-600 px-2 py-1 rounded">
          <span className="text-xl">❓</span>
          <span className="italic text-gray-300">Unknown</span>
        </div>
      )}

      <div className="flex items-center flex-wrap gap-2 text-gray-300 bg-slate-700 px-4 py-1 rounded">
        <span className="font-medium whitespace-nowrap">Costs:</span>
        {fusion.recipe.costs.map((cost) => (
          <ResourceCostDisplay key={cost.resource} cost={cost} />
        ))}
      </div>

      <span
        className={`px-2 py-1 rounded font-medium self-start md:self-auto ${
          fusion.discovered
            ? "bg-green-700 text-green-200"
            : "bg-gray-600 text-gray-300 italic"
        }`}
      >
        {fusion.discovered ? "Unlocked" : "Unknown"}
      </span>
    </div>
  );
}
