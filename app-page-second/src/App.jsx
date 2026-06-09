import React, { useMemo, useState } from "react";
import CalendarComponent from "./components/StencilCalendarWrapper";
import SelectedDateCard from "./components/SelectedDateCard";
import UpcomingEvents from "./components/UpcomingEvents";
import {
  CALENDAR_ICON,
  PAGE_DESCRIPTION,
  PAGE_SUBTITLE,
  PAGE_TITLE,
} from "./constants/calendarText";
import { UPCOMING_EVENTS } from "./constants/upcomingEvents";
import { getEventsForDate, isSameMonthYear, parseDateSafe } from "./utils/dateUtils";

export default function AppPageSecond() {
  const [selectedDate, setSelectedDate] = useState(null);

  const dateObj = useMemo(() => parseDateSafe(selectedDate), [selectedDate]);

  const selEvents = useMemo(() => {
    if (!dateObj) return [];
    const now = new Date();
    return isSameMonthYear(dateObj, now)
      ? getEventsForDate(dateObj, UPCOMING_EVENTS)
      : [];
  }, [dateObj]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white text-lg">{CALENDAR_ICON}</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{PAGE_TITLE}</h1>
              <p className="text-xs text-gray-500">{PAGE_SUBTITLE}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{PAGE_DESCRIPTION}</p>
        </div>

        <div className="flex flex-row lg:flex-row gap-4">
          <div className="shrink-0">
            <CalendarComponent
              onDateSelect={(isoStr) => setSelectedDate(isoStr)}
              highlightToday={true}
            />
          </div>

          <div className="flex-1 space-y-4 min-w-0">
            {dateObj && <SelectedDateCard dateObj={dateObj} events={selEvents} />}
            <UpcomingEvents events={UPCOMING_EVENTS} />
          </div>
        </div>
      </div>
    </div>
  );
}
