import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCourses from "./DashboardCourses";
import DashboardQuickLinks from "./DashboardQuickLinks";
import { DASHBOARD_STATS, DASHBOARD_COURSES, DASHBOARD_LINKS } from "../constants/dashboardData";
import {
  DASHBOARD_HEADER_TITLE,
  DASHBOARD_HEADER_SUBTITLE,
} from "../constants/dashboardText";

export default function Dashboard({ onNavigate }) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <DashboardHeader
        title={DASHBOARD_HEADER_TITLE}
        subtitle={DASHBOARD_HEADER_SUBTITLE}
      />
      <DashboardStats stats={DASHBOARD_STATS} />
      <DashboardCourses courses={DASHBOARD_COURSES} />
      <DashboardQuickLinks links={DASHBOARD_LINKS} onNavigate={onNavigate} />

    </div>
  );
}
