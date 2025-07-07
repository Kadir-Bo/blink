import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "context";
import { AuthHeader } from "components";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <AuthHeader /> : <Header />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
