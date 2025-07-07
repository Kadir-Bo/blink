import React, { useRef } from "react";
import { Search } from "react-feather";

const Searchbar = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="border px-4 py-2 rounded-md bg-gray-50 flex items-center relative w-full group"
      tabIndex={0} // damit das div überhaupt fokussierbar ist
      onFocus={handleFocus}
    >
      <Search
        size={21}
        className="absolute group-focus-within:stroke-gray-900 stroke-gray-400 transition-all duration-150"
      />
      <input
        ref={inputRef}
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search"
        className="outline-none pl-8 bg-transparent"
      />
    </div>
  );
};

export default Searchbar;
