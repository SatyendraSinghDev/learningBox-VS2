import React from "react";
import { SELECTED_DATE_LABEL, NO_EVENTS_LABEL } from "../constants/calendarText";
import { formatDateLabel } from "../utils/dateUtils";

export default function SelectedDateCard({ dateObj, events }) {
  return (
    <div className="bg-white rounded-2xl border border-indigo-200 p-4">
      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">
        {SELECTED_DATE_LABEL}
      </p>
      <p className="font-semibold text-gray-800 text-sm">{formatDateLabel(dateObj)}</p>

      {events.length > 0 ? (
        <div className="mt-2 space-y-1.5">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                style={{ background: event.dot }}
                className="w-2 h-2 rounded-full shrink-0 inline-block"
              />
              <span className="text-xs font-medium text-gray-700">{event.title}</span>
              <span className="text-xs text-gray-400 ml-auto capitalize">{event.type}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-1 italic">{NO_EVENTS_LABEL}</p>
      )}
    </div>
  );
}
