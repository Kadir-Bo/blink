import { Logo, Searchbar } from "components";
import React from "react";
import { Columns, Menu, RotateCcw, Settings } from "react-feather";

const AuthHeader = ({ handleToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-center">
      <nav className="px-4 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-16 relative w-full">
          <div className="flex items-center justify-between gap-4 max-w-[200px] w-full ">
            <button
              onClick={handleToggleSidebar}
              className="outline-none flex justify-center items-center w-1/4  h-full"
            >
              <Menu size={21} />
            </button>
            <div className="w-full flex justify-center ">
              <Logo />
            </div>
          </div>
          <div className="w-1/2 ">
            <Searchbar />
          </div>
        </div>
        <ul className="flex flex-row items-center gap-2">
          <li>
            <button className="outline-none p-2">
              <RotateCcw className="stroke-gray-900" size={19} />
            </button>
          </li>
          <li>
            <button className="outline-none p-2">
              <Columns className="stroke-gray-900" size={19} />
            </button>
          </li>
          <li>
            <button className="outline-none p-2">
              <Settings className="stroke-gray-900" size={19} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
