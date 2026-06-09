import React, { useEffect, useRef } from 'react';

// Load the built Stencil web component
// After building stencil-calendar, copy dist to app-page-second/src/stencil-dist/
// OR install as local package — see README
let defined = false;
function loadStencilCalendar() {
  if (defined) return;
  defined = true;
  // Dynamically import the stencil-calendar dist bundle
  import('../../stencil-dist/stencil-calendar.js').catch(() => {
    console.warn('Stencil calendar dist not found. Run: cd stencil-calendar && npm install && npm run build');
  });
}

/**
 * StencilCalendarWrapper
 * React wrapper around the <lb-calendar> Stencil web component.
 *
 * Props:
 *   onDateSelect(isoString) — called when a date is selected
 *   events — array of { day, title, type, dot } objects
 */
export default function StencilCalendarWrapper({ onDateSelect, events = null }) {
  const ref = useRef(null);

  useEffect(() => {
    loadStencilCalendar();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleDateSelected(e) {
      onDateSelect && onDateSelect(e.detail);
    }

    el.addEventListener('dateSelected', handleDateSelected);
    return () => el.removeEventListener('dateSelected', handleDateSelected);
  }, [onDateSelect]);

  const eventsJson = events ? JSON.stringify(events) : undefined;

  return (
    <lb-calendar
      ref={ref}
      highlight-today="true"
      events={eventsJson}
    />
  );
}
