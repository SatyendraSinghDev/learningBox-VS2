const STATUS_TEXTS = {
  404: "Not Found",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

export function simulateFetch(url, shouldFail, status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        if (status === 0) {
          reject(new TypeError("Failed to fetch"));
        } else {
          resolve(
            new Response(JSON.stringify({ error: "simulated" }), {
              status,
              statusText: STATUS_TEXTS[status] || "Error",
            })
          );
        }
      } else {
        resolve(
          new Response(JSON.stringify({ success: true, data: [] }), {
            status: 200,
            statusText: "OK",
          })
        );
      }
    }, 400);
  });
}

export function getApiRequestOptions(endpoint) {
  return endpoint.method === "POST"
    ? {
        method: "POST",
        body: JSON.stringify(endpoint.body),
        headers: { "Content-Type": "application/json" },
      }
    : { method: "GET" };
}

export function mapStatCards(cards, successCount, errorCount) {
  return cards.map((card) => ({
    ...card,
    value:
      card.key === "total"
        ? successCount + errorCount
        : card.key === "success"
        ? successCount
        : errorCount,
  }));
}

export function formatApiLogEntry({ type, url, status, statusText }) {
  const symbol = type === "error" ? "✗" : "✓";
  const statusDisplay = type === "error" ? status || "NET" : status;
  return `[${new Date().toLocaleTimeString()}] ${symbol} ${url} → ${statusDisplay} ${statusText}`;
}
