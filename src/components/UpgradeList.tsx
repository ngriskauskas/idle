import type { Upgrade } from "../state/Upgrades";
import { UpgradeCard } from "./UpgradeCard";

export function UpgradeList({ upgrades }: { upgrades: Upgrade[] }) {
  return (
    <div className="flex flex-col space-y-4">
      {upgrades.map((upgrade) => (
        <UpgradeCard key={upgrade.name} upgrade={upgrade}></UpgradeCard>
      ))}
    </div>
  );
}
