import React, { useRef } from "react";
import { Search } from "react-feather";

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className="border px-4 py-2 rounded-md bg-gray-50 flex items-center relative w-full group cursor-text"
      tabIndex={0} // make div focusable
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
        value={searchQuery} // controlled input
        onChange={handleChange} // update context state
        className="outline-none pl-8 bg-transparent w-full"
        autoComplete="off"
      />
    </div>
  );
};

export default Searchbar;
