import React, { createContext, useContext, useState } from "react";
import { useAuth } from "context";
import { Header, Footer, AuthHeader, Sidebar, Modal } from "components";
import { ModalContextProvider } from "./ModalContext";
const LayoutContext = createContext();
const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashboardComponent, setDashboardComponent] = useState(null);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleDashboardComponent = (id) => {
    setDashboardComponent(id);
  };

  const values = {
    showSidebar,
    dashboardComponent,
  };
  return (
    <LayoutContext.Provider value={values}>
      <ModalContextProvider>
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
              dashboardComponent={dashboardComponent}
            />
          )}
          <main className="w-full">{children}</main>
        </div>
        {!currentUser && <Footer />}
      </ModalContextProvider>
    </LayoutContext.Provider>
  );
};

export { useLayout, LayoutContextProvider };
