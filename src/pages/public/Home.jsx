import { useAuth } from "context";
import { Dashboard } from "pages";
import React from "react";

const Home = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Dashboard /> : <Home />;
};

export default Home;
