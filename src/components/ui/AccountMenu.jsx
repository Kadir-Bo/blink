import { defaultProfileImage } from "assets";
import clsx from "clsx";
import { UserSettingsModal } from "components";
import { useAuth } from "context";
import { useModal } from "context/ModalContext";
import { useOnClickOutside } from "hooks";
import React, { useState, useRef } from "react";
import { LogOut, Settings } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  useOnClickOutside(menuRef, () => setOpen(false));
  const { openModal } = useModal();
  // Open User Settings Modal
  const handleOpenSettingsUserMessage = () => {
    openModal(<UserSettingsModal />);
  };
  // Logout Function
  const handleLogout = async () => {
    await logout();
    navigate("/");
    setOpen(false);
  };
  return (
    <div className="relative mx-2 mb-2" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className={clsx(
          "font-medium text-sm hover:bg-gray-100 transition-all duration-200 cursor-pointer py-3 px-4 rounded-lg flex items-center justify-between",
          open ? "bg-gray-100" : ""
        )}
      >
        <span className="mr-2 text-gray-800">{currentUser.displayName}</span>
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <img
            src={
              currentUser.photoURL ? currentUser.photoURL : defaultProfileImage
            }
            alt="user profile"
            className="w-full object-fill"
          />
        </div>
      </div>

      {open && (
        <div className="absolute bottom-14 left-0 w-full bg-white rounded-md z-10 border font-medium">
          <button
            className="w-full text-left p-4 text-sm hover:bg-gray-100 flex justify-start items-center gap-2"
            onClick={handleOpenSettingsUserMessage}
          >
            <Settings size={17} />
            Settings
          </button>
          <button
            className="w-full text-left p-4 text-sm text-red-600 hover:bg-gray-100 flex justify-start items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
