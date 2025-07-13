import { useState } from "react";
import ResourcePage from "./ResourcePage";
import FusionPage from "./FusionPage";

type Tab = "resources" | "fusions";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<Tab>("resources");

  const tabClass = (tab: Tab) =>
    `px-4 py-2 rounded-t-md transition-colors duration-200 font-semibold ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="h-screen flex flex-col bg-blue-100 text-gray-100">
      {/* Header */}
      <div className="max-w-5xl w-full mx-auto pt-2 md:pt-8 px-1">
        <div className="flex space-x-2 border-b border-gray-300 mx-1">
          <button
            className={tabClass("resources")}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
          <button
            className={tabClass("fusions")}
            onClick={() => setActiveTab("fusions")}
          >
            Fusions
          </button>
        </div>
      </div>

      {/* Scrollable white box, with bottom gap */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl px-2 md:px-2">
          <div
            className="bg-white rounded-b-md shadow overflow-y-auto md:p-2 flex justify-center"
            style={{
              maxHeight:
                window.innerWidth < 768
                  ? "calc(100vh - 55px)" // mobile (smaller header)
                  : "calc(100vh - 80px)", // desktop
            }}
          >
            {activeTab === "resources" && <ResourcePage />}
            {activeTab === "fusions" && <FusionPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
