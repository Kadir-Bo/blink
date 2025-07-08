import { DashboardTasks, DashboardArchive, DashboardTrash } from "components";
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
      return <DashboardTasks />;
  }
};

export default Dashboard;
