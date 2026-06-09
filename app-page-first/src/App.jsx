import React from "react";
import ErrorBannerList from "./components/ErrorBannerList";
import HeaderSection from "./components/HeaderSection";
import ApiEndpointGrid from "./components/ApiEndpointGrid";
import StatsGrid from "./components/StatsGrid";
import StatusBanner from "./components/StatusBanner";
import InterceptorLog from "./components/InterceptorLog";
import { UI_TEXT } from "./constants/uiText";
import { REAL_ENDPOINTS } from "./constants/realApiEndpoints";
import useApiMonitor from "./hooks/useApiMonitor";

export default function AppPageFirst() {
  const {
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
  } = useApiMonitor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <HeaderSection
          icon={UI_TEXT.appIcon}
          title={UI_TEXT.appTitle}
          subtitle={UI_TEXT.appSubtitle}
          description={UI_TEXT.appDescription}
        />
        <StatsGrid stats={stats} />
        <ApiEndpointGrid
          title={UI_TEXT.realApiCallsTitle}
          description={UI_TEXT.realApiCallsDescription}
          endpoints={REAL_ENDPOINTS}
          activeEndpointLabel={loading}
          onEndpointClick={handleRealCall}
        />
        <InterceptorLog log={log} onClear={clearLog} />
        <ErrorBannerList
          errors={errors}
          onDismissError={dismissError}
          onDismissAll={clearLog}
        />
        {errors.length === 0 && (successCount + errorCount) > 0 && (
          <StatusBanner icon="✅" className="bg-green-50 border border-green-200 text-green-700" role="status">
            {UI_TEXT.allErrorsClearedMessage}
          </StatusBanner>
        )}
      </div>
    </div>
  );
}
