import React, { Suspense, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import RemoteErrorBoundary from "./components/RemoteErrorBoundary";

// Dynamically import remote microfrontend apps via Module Federation
const AppPageFirst = React.lazy(() => import("AppPageFirst/App"));
const AppPageSecond = React.lazy(() => import("AppPageSecond/App"));

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <Dashboard onNavigate={handleNavigate} />;

      case "app1":
        return (
          <RemoteErrorBoundary name="AppPageFirst">
            <Suspense fallback={<LoadingSpinner name="AppPageFirst" />}>
              <AppPageFirst />
            </Suspense>
          </RemoteErrorBoundary>
        );

      case "app2":
        return (
          <RemoteErrorBoundary name="AppPageSecond">
            <Suspense fallback={<LoadingSpinner name="AppPageSecond" />}>
              <AppPageSecond />
            </Suspense>
          </RemoteErrorBoundary>
        );

      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
