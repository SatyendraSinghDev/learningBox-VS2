export function parseDateSafe(value) {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

export function isSameMonthYear(dateA, dateB) {
  return (
    dateA?.getMonth() === dateB?.getMonth() &&
    dateA?.getFullYear() === dateB?.getFullYear()
  );
}

export function getEventsForDate(dateObj, events = []) {
  if (!dateObj) return [];
  return events.filter((item) => item.day === dateObj.getDate());
}

export function formatDateLabel(dateObj, locale = "en-IN") {
  return dateObj
    ? dateObj.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
}
