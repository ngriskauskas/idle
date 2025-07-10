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
    <div className="bg-blue-100 min-h-screen text-gray-100 pt-1 md:pt-8">
      <div className="max-w-5xl mx-auto">
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

        <div className="p-1 md:p-2 bg-white border border-gray-300 rounded-b-md shadow">
          {activeTab === "resources" && <ResourcePage />}
          {activeTab === "fusions" && <FusionPage />}
        </div>
      </div>
    </div>
  );
}
