import React, { createContext, useContext, useState } from "react";
import { useAuth, UserMessageContextProvider } from "context";
import { Header, Footer, AuthHeader, Sidebar } from "components";
import { ModalContextProvider } from "./ModalContext";

const LayoutContext = createContext();

const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [dashboardComponent, setDashboardComponent] = useState(null);
  const [columnView, setColumnView] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleDashboardComponent = (id) => {
    setDashboardComponent(id);
  };

  const handleColumnView = () => {
    setColumnView((prev) => !prev);
  };

  const handleShowContextMenu = () => {
    setShowContextMenu(true);
  };

  const handleHideContextMenu = () => {
    setShowContextMenu(false);
  };

  // Implement reload: reset UI states & optionally refetch data
  const handleReload = () => {
    setSearchQuery("");
    setDashboardComponent(null);
    setColumnView(false);
    setShowSidebar(true);
    setShowContextMenu(false);
  };

  const values = {
    showSidebar,
    dashboardComponent,
    columnView,
    showContextMenu,
    handleShowContextMenu,
    handleHideContextMenu,
    searchQuery,
    setSearchQuery,
    handleReload, // expose reload handler
  };

  return (
    <LayoutContext.Provider value={values}>
      <ModalContextProvider>
        <UserMessageContextProvider>
          {currentUser ? (
            <AuthHeader
              handleToggleSidebar={handleToggleSidebar}
              handleColumnView={handleColumnView}
              columnView={columnView}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onReload={handleReload} // pass reload handler to AuthHeader
            />
          ) : (
            <Header />
          )}
          <div
            className={`min-h-screen ${
              currentUser ? "flex flex-row gap-8" : ""
            }`}
          >
            {currentUser && (
              <Sidebar
                isVisible={showSidebar}
                handleComponent={handleDashboardComponent}
                dashboardComponent={dashboardComponent}
                handleCloseSidebar={handleCloseSidebar}
              />
            )}
            <main className="w-full">{children}</main>
          </div>
          {!currentUser && <Footer />}
        </UserMessageContextProvider>
      </ModalContextProvider>
    </LayoutContext.Provider>
  );
};

export { useLayout, LayoutContextProvider };
