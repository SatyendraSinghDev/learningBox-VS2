import { useState, useEffect, useCallback, useMemo } from "react";
import { apiFetch, onApiError, onApiSuccess } from "../apiInterceptor";
import { getApiRequestOptions, mapStatCards, formatApiLogEntry } from "../utils/appUtils";
import { STAT_CARDS } from "../constants/statsConfig";

export default function useApiMonitor() {
  const [errors, setErrors] = useState([]);
  const [log, setLog] = useState([]);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const removeErrorListener = onApiError((err) => {
      setErrors((prev) => [err, ...prev].slice(0, 10));
      setErrorCount((c) => c + 1);
      setLog((prev) => [
        {
          type: "error",
          msg: formatApiLogEntry({ type: "error", url: err.url, status: err.status, statusText: err.statusText }),
        },
        ...prev,
      ].slice(0, 30));
    });

    const removeSuccessListener = onApiSuccess(({ url, status }) => {
      setSuccessCount((c) => c + 1);
      setLog((prev) => [
        {
          type: "success",
          msg: formatApiLogEntry({ type: "success", url, status, statusText: "OK" }),
        },
        ...prev,
      ].slice(0, 30));
    });

    return () => {
      removeErrorListener();
      removeSuccessListener();
    };
  }, []);

  const handleRealCall = useCallback(async (ep) => {
    setLoading(ep.label);
    setResults((prev) => ({ ...prev, [ep.label]: { status: "loading" } }));

    try {
      const options = getApiRequestOptions(ep);
      const data = await apiFetch(ep.url, options);
      setResults((prev) => ({
        ...prev,
        [ep.label]: { status: "success", data: Array.isArray(data) ? data.slice(0, 2) : data },
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [ep.label]: { status: "error", error: err },
      }));
    } finally {
      setLoading(null);
    }
  }, []);

  const dismissError = useCallback((index) => {
    setErrors((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearLog = useCallback(() => {
    setLog([]);
    setErrors([]);
  }, []);

  const stats = useMemo(
    () => mapStatCards(STAT_CARDS, successCount, errorCount),
    [successCount, errorCount]
  );

  return {
    errors,
    log,
    results,
    loading,
    stats,
    successCount,
    errorCount,
    handleRealCall,
    dismissError,
    clearLog,
  };
}
