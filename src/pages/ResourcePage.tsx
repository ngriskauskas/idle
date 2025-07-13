import { useState } from "react";
import { ResourceBar } from "../components/ResourceBar";
import { UpgradeList } from "../components/UpgradeList";
import { type Resource, type ResourceKey } from "../state/Resources";
import { useGameState } from "../state/StateProvider";

export default function ResourcePage() {
  const { resources, upgrades } = useGameState();
  const [collapsed, setCollapsed] = useState<Record<ResourceKey, boolean>>(
    {} as Record<ResourceKey, boolean>
  );

  const toggleCollapse = (key: ResourceKey) => {
    setCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-full overflow-y-auto p-1">
      <div className="columns-2 gap-x-1 md:gap-x-2">
        {(Object.entries(resources) as [ResourceKey, Resource][]).map(
          ([key, resource]) => {
            const availableUpgrades = upgrades.available.filter(
              (x) => x.resource === key
            );
            return (
              <div
                key={key}
                className="bg-gray-600 break-inside-avoid w-full p-1 md:p-6 rounded-xl space-y-1 md:space-y-4 md:mb-2 mb-1"
              >
                <ResourceBar
                  resource={resource}
                  toggleCollapse={() => toggleCollapse(key)}
                />
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    collapsed[key]
                      ? "max-h-0 opacity-0"
                      : "max-h-[1000px] opacity-100"
                  }`}
                >
                  <UpgradeList upgrades={availableUpgrades} />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
