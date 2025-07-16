import { Logo, Searchbar } from "components";
import React from "react";
import { Columns, Menu, RotateCcw, Settings, Table } from "react-feather";

const AuthHeader = ({
  handleToggleSidebar,
  handleColumnView,
  columnView,
  searchQuery,
  setSearchQuery,
  onReload,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-center bg-white z-50">
      <nav className="px-4 py-4 flex justify-between items-center w-full max-w-[1920px] mx-auto">
        {/* Left: Sidebar toggle + Logo */}
        <div className="flex items-center gap-16 relative w-full">
          <div className="flex items-center justify-between gap-4 max-w-[200px] w-full">
            <button
              aria-label="Toggle sidebar"
              onClick={handleToggleSidebar}
              className="outline-none flex justify-center items-center w-1/4 h-full"
            >
              <Menu size={21} />
            </button>
            <div className="w-full flex justify-start">
              <Logo />
            </div>
          </div>

          {/* Center: Searchbar */}
          <div className="w-1/2">
            <Searchbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        {/* Right: Action buttons */}
        <ul className="flex flex-row items-center gap-2">
          {/* Reload Button */}
          <li>
            <button
              aria-label="Reload"
              onClick={onReload}
              className="outline-none p-2 hover:bg-gray-100 rounded"
            >
              <RotateCcw className="stroke-gray-900" size={19} />
            </button>
          </li>

          {/* Toggle Column/List View */}
          <li>
            <button
              aria-label="Toggle view"
              onClick={handleColumnView}
              className="outline-none p-2 hover:bg-gray-100 rounded"
            >
              {columnView ? (
                <Table className="stroke-gray-900 rotate-90" size={19} />
              ) : (
                <Columns className="stroke-gray-900 rotate-90" size={19} />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
