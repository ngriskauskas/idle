import { TickRate } from "../state/GameLoop";
import { ResourceIcons, type Resource } from "../state/Resources";

interface ResourceBarProps {
  resource: Resource;
  toggleCollapse: () => void;
}

export function ResourceBar({
  resource: { amount, max, name, color, rate },
  toggleCollapse,
}: ResourceBarProps) {
  const percentFull = (amount / max) * 100;

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-2 text-white text-sm flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{ResourceIcons[name]}</span>
          <span className="font-semibold text-lg capitalize">{name}</span>
        </div>
        <span className="text-gray-300 font-mono text-sm">
          +{(rate / TickRate) * 1000}/s
        </span>
        <div className="cursor-pointer" onClick={toggleCollapse}>
          <span>▼</span>
        </div>
      </div>
      <div className="relative w-full h-8 bg-gray-900 rounded-md border-2 border-gray-600 overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${percentFull}%`, backgroundColor: color }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-mono text-white select-none pointer-events-none">
          {Math.floor(amount)} / {max}
        </div>
      </div>
    </div>
  );
}
