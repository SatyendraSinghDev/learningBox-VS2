import React from "react";
import ErrorBanner from "./ErrorBanner";
import { UI_TEXT } from "../constants/uiText";

export default function ErrorBannerList({ errors, onDismissError, onDismissAll }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">
          {UI_TEXT.activeErrorsTitle} ({errors.length})
        </h2>
        <button
          type="button"
          onClick={onDismissAll}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          {UI_TEXT.dismissAllButtonLabel}
        </button>
      </div>

      {errors.map((error, index) => (
        <ErrorBanner
          key={`${error.timestamp}-${index}`}
          error={error}
          onDismiss={() => onDismissError(index)}
        />
      ))}
    </div>
  );
}
