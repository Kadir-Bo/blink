import { Logo } from "components";
import { useAuth } from "context";
import React from "react";
import { Menu } from "react-feather";
import { useNavigate } from "react-router-dom";

const AuthHeader = ({ handleToggleSidebar }) => {
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
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-center">
      <nav className="container py-4 flex justify-between items-center">
        <div className="flex items-center gap-8 relative">
          <button onClick={handleToggleSidebar} className="outline-none">
            <Menu size={21} />
          </button>
          <Logo />
        </div>
        <div className="flex gap-4 font-medium"></div>
      </nav>
    </header>
  );
};

export default AuthHeader;
