import { ResourceBar } from "../components/ResourceBar";
import { UpgradeList } from "../components/UpgradeList";
import { type Resource, type ResourceKey } from "../state/Resources";
import { useGameState } from "../state/StateProvider";

export default function ResourcePage() {
  const { resources, upgrades } = useGameState();

  return (
    <div className=" max-w-5xl bg-gray-500 p-10 rounded-2xl m-6">
      <span className="block font-semibold text-lg mb-6 text-white">
        Resources
      </span>
      <div className="  grid grid-cols-2 gap-6">
        {(Object.entries(resources) as [ResourceKey, Resource][]).map(
          ([key, resource]) => {
            const availableUpgrades = upgrades.available.filter(
              (x) => x.resource === key
            );
            return (
              <div
                key={key}
                className="bg-gray-600 max-w-md w-full p-6 rounded-xl space-y-4 mb-6"
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
