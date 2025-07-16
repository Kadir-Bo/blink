import { useAuth } from "context";
import { Dashboard, Landingpage } from "pages";
import React from "react";

const Home = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Dashboard /> : <Landingpage />;
};

export default Home;
