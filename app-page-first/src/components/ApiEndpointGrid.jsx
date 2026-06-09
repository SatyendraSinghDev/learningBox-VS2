import React from "react";
import { UI_TEXT } from "../constants/uiText";

function ApiEndpointGrid({
  title,
  description,
  endpoints,
  activeEndpointLabel,
  onEndpointClick,
  buttonLabel = UI_TEXT.fireRequestButton,
  loadingLabel = UI_TEXT.fetchingButton,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
      <h2 className="font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-xs text-gray-400 mb-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {endpoints.map((endpoint) => {
          const isLoading = activeEndpointLabel === endpoint.label;
          const buttonClassName = [
            "w-full py-2.5 px-5 rounded-lg text-xs font-medium transition",
            endpoint.expectSuccess
              ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
              : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200",
            isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          ].join(" ");

          return (
            <div key={endpoint.label} className="border border-gray-100 rounded-xl p-3 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 py-2.5 px-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-800">{endpoint.label}</p>
                  <p className="text-xs text-gray-400">{endpoint.description}</p>
                </div>
                <span>
                  <button
                    type="button"
                    onClick={() => onEndpointClick(endpoint)}
                    disabled={isLoading}
                    className={buttonClassName}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-1">
                        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        {loadingLabel}
                      </span>
                    ) : buttonLabel}
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApiEndpointGrid;
