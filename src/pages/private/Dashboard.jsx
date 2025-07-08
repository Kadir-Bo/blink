import { DashboardArchive, DashboardTrash } from "components";
import Dashbaordtasks from "components/dashboard/Dashboardtasks";
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
      return <Dashbaordtasks />;
  }
};

export default Dashboard;
