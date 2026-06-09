import { UI_TEXT } from "./uiText";

export const STAT_CARDS = [
  {
    key: "total",
    label: UI_TEXT.totalLabel,
    borderClass: "border-gray-200",
    labelClass: "text-gray-500",
    valueClass: "text-gray-900",
  },
  {
    key: "success",
    label: UI_TEXT.successLabel,
    borderClass: "border-green-200",
    labelClass: "text-green-600",
    valueClass: "text-green-700",
  },
  {
    key: "failed",
    label: UI_TEXT.failedLabel,
    borderClass: "border-red-200",
    labelClass: "text-red-500",
    valueClass: "text-red-600",
  },
];
