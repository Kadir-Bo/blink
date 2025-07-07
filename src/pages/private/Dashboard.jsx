import { DashboardArchive, DashboardTrash } from "components";
import DashbaordNotes from "components/dashboard/DashboardNotes";
import { useLayout } from "context";
import React from "react";

const Dashboard = () => {
  const { dashboardComponent } = useLayout();
  switch (dashboardComponent) {
    case "archive":
      return <DashboardArchive />;
    case "trash":
      return <DashboardTrash />;
    default:
      return <DashbaordNotes />;
  }
};

export default Dashboard;
