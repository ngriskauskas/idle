import { useState } from "react";
import { useGameLoop } from "../state/GameLoop";
import BuildingPage from "./BuildingPage";
import FusionPage from "./FusionPage";
import PrestigePage from "./PrestigePage";
import ResourcePage from "./ResourcePage";
import TechPage from "./TechPage";
import { useGameState } from "../state/GameState";
import { StartingResourcePicker } from "../components/StartingResourcePicker";

type Tab = "resources" | "fusions" | "buildings" | "tech" | "prestige";

export default function MainPage() {
  useGameLoop();
  const [activeTab, setActiveTab] = useState<Tab>("resources");

  const resources = useGameState((s) => s.resources.state);
  const hasResources = Object.values(resources).some((r) => r.amount > 0);
  const tabs = useGameState((s) => s.tabs.state);

  const tabClass = (tab: Tab) =>
    `px-4 py-2 rounded-t-md transition-colors duration-200 font-semibold ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <>
      {!hasResources && <StartingResourcePicker />}
      <div className="h-screen flex flex-col bg-blue-100 text-gray-100">
        <div className="max-w-5xl w-full mx-auto pt-2 md:pt-8 px-1">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 border-b border-gray-300 mx-1">
              <button
                hidden={!tabs.resources}
                className={tabClass("resources")}
                onClick={() => setActiveTab("resources")}
              >
                Resources
              </button>
              <button
                hidden={!tabs.fusions}
                className={tabClass("fusions")}
                onClick={() => setActiveTab("fusions")}
              >
                Fusions
              </button>
              <button
                hidden={!tabs.buildings}
                className={tabClass("buildings")}
                onClick={() => setActiveTab("buildings")}
              >
                Buildings
              </button>
              <button
                hidden={!tabs.tech}
                className={tabClass("tech")}
                onClick={() => setActiveTab("tech")}
              >
                Tech
              </button>
              <button
                hidden={!tabs.prestige}
                className={tabClass("prestige")}
                onClick={() => setActiveTab("prestige")}
              >
                Prestige
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-5xl px-2 md:px-2">
            <div
              className="bg-white rounded-b-md shadow overflow-y-auto md:p-2 flex justify-center"
              style={{
                maxHeight:
                  window.innerWidth < 768
                    ? "calc(100vh - 55px)"
                    : "calc(100vh - 80px)",
              }}
            >
              {activeTab === "resources" && <ResourcePage />}
              {activeTab === "fusions" && <FusionPage />}
              {activeTab === "buildings" && <BuildingPage />}
              {activeTab === "tech" && <TechPage />}
              {activeTab === "prestige" && <PrestigePage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
