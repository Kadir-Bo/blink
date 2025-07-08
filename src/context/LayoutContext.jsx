import React, { createContext, useContext, useState } from "react";
import { useAuth } from "context";
import { Header, Footer, AuthHeader, Sidebar } from "components";
const LayoutContext = createContext();
const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashboardComponent, setDashboardComponent] = useState();

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleDashboardComponent = (id) => {
    if (id === "tasks") {
      setDashboardComponent(null);
    } else {
      setDashboardComponent(id);
    }
  };
  const values = {
    showSidebar,
    dashboardComponent,
  };
  return (
    <LayoutContext.Provider value={values}>
      {currentUser ? (
        <AuthHeader handleToggleSidebar={handleToggleSidebar} />
      ) : (
        <Header />
      )}
      <div
        className={`min-h-screen ${currentUser ? "flex flex-row gap-8" : ""}`}
      >
        {currentUser && (
          <Sidebar
            isVisible={showSidebar}
            handleComponent={handleDashboardComponent}
          />
        )}
        <main className="w-full">{children}</main>
      </div>
      {!currentUser && <Footer />}
    </LayoutContext.Provider>
  );
};

export { useLayout, LayoutContextProvider };
