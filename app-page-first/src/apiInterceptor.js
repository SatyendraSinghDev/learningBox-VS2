// apiInterceptor.js — Common API Interceptor
// Uses native fetch only (no axios)
// Catches all failed API scenarios and notifies all registered listeners

const errorListeners = [];
const successListeners = [];

/**
 * Register a callback to be called on every API error
 * @param {Function} callback - receives { status, statusText, message, url, timestamp }
 */
export function onApiError(callback) {
  errorListeners.push(callback);
  return () => {
    const index = errorListeners.indexOf(callback);
    if (index !== -1) {
      errorListeners.splice(index, 1);
    }
  };
}

/**
 * Register a callback to be called on every successful API response
 * @param {Function} callback - receives { data, url, status }
 */
export function onApiSuccess(callback) {
  successListeners.push(callback);
  return () => {
    const index = successListeners.indexOf(callback);
    if (index !== -1) {
      successListeners.splice(index, 1);
    }
  };
}

function notifyError(errorData) {
  errorListeners.forEach((cb) => cb(errorData));
}

function notifySuccess(responseData) {
  successListeners.forEach((cb) => cb(responseData));
}

/**
 * apiFetch — drop-in fetch wrapper with interceptor
 * Automatically catches HTTP errors (4xx, 5xx) and network failures
 * Throws a structured error object and notifies all onApiError listeners
 */
export async function apiFetch(url, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = {
        status: response.status,
        statusText: response.statusText,
        message: `HTTP Error: ${response.status} ${response.statusText}`,
        url,
        timestamp: new Date().toISOString(),
      };
      notifyError(errorData);
      throw errorData;
    }

    const data = await response.json();
    notifySuccess({ data, url, status: response.status });
    return data;
  } catch (err) {
    // Network/CORS/offline error (no HTTP response)
    if (!err.status) {
      const networkError = {
        status: 0,
        statusText: "Network Error",
        message: err.message || "Failed to fetch. Check your network connection.",
        url,
        timestamp: new Date().toISOString(),
      };
      notifyError(networkError);
      throw networkError;
    }
    throw err;
  }
}

export default apiFetch;
