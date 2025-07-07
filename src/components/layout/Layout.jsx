import React from "react";
import { useAuth } from "context";
import { Header, Footer, AuthHeader, Sidebar } from "components";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <AuthHeader /> : <Header />}
      <div className={currentUser ? "flex flex-row" : ""}>
        <Sidebar />
        {children}
      </div>
      {!currentUser && <Footer />}
    </>
  );
};

export default Layout;
