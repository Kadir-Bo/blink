import { Logo } from "components";
import { useAuth } from "context";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full">
      <nav className="container py-4 flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 font-medium">
          <button
            className="px-4 py-1.5 bg-black text-white border rounded capitalize text-sm min-w-20"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
