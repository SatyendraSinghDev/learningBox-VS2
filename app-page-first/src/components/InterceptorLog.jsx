import React from "react";
import { UI_TEXT } from "../constants/uiText";

function InterceptorLog({ log, onClear }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-semibold text-gray-800">{UI_TEXT.interceptorLogTitle}</h2>
                    <p className="text-xs text-gray-400">{UI_TEXT.interceptorLogSubtitle}</p>
                </div>
                {log.length > 0 && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-xs text-gray-400 hover:text-gray-600"
                    >
                        {UI_TEXT.clearButtonLabel}
                    </button>
                )}
            </div>

            <div className="bg-gray-950 rounded-xl p-3 font-mono text-xs min-h-52 max-h-64 overflow-y-auto">
                {log.length === 0 ? (
                    <p className="text-gray-500 italic px-5 py-2 rounded">{UI_TEXT.interceptorLogEmpty}</p>
                ) : (
                    log.map((entry, index) => (
                        <div
                            key={entry.timestamp ? `${entry.timestamp}-${index}` : index}
                            className="mb-1 px-5 py-2 rounded"
                            style={{ color: entry.type === "error" ? "#f87171" : "#34d399" }}
                        >
                            {entry.msg}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default InterceptorLog;
