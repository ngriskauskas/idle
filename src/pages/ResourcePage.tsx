import { ResourceBar } from "../components/ResourceBar";
import { UpgradeList } from "../components/UpgradeList";
import { type Resource, type ResourceKey } from "../state/Resources";
import { useGameState } from "../state/StateProvider";

export default function ResourcePage() {
  const { resources, upgrades } = useGameState();

  return (
    <div className="max-w-5xl bg-gray-500 p-2 md:p-4 rounded-2xl sm:m-2 md:m-6">
      <span className="block font-semibold text-lg mb-4 text-white">
        Resources
      </span>
      <div className="grid grid-cols-2 gap-x-2">
        {(Object.entries(resources) as [ResourceKey, Resource][]).map(
          ([key, resource]) => {
            const availableUpgrades = upgrades.available.filter(
              (x) => x.resource === key
            );
            return (
              <div
                key={key}
                className="bg-gray-600 w-full p-2 md:p-6 rounded-xl space-y-2 md:space-y-4 mb-4"
              >
                <ResourceBar resource={resource}></ResourceBar>
                <UpgradeList upgrades={availableUpgrades}></UpgradeList>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
