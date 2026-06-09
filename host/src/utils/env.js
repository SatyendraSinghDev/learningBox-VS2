const isProd =
  typeof window !== "undefined" && window.location.hostname !== "localhost";

const REMOTE_URLS = {
  app1: isProd
    ? "https://learningbox-app-page-first.vercel.app"
    : "http://localhost:3001",
  app2: isProd
    ? "https://learningbox-app-page-second.vercel.app"
    : "http://localhost:3002",
};

export { isProd, REMOTE_URLS };
