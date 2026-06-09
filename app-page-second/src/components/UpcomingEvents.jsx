import React from "react";
import { UPCOMING_TITLE } from "../constants/calendarText";

export default function UpcomingEvents({ events }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 text-sm mb-3">{UPCOMING_TITLE}</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
              {event.day}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{event.title}</p>
              <span className="text-xs font-medium capitalize" style={{ color: event.dot }}>
                {event.type}
              </span>
            </div>
            <span style={{ background: event.dot }} className="w-2 h-2 rounded-full shrink-0 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
