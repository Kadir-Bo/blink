import { Logo } from "components";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full">
      <nav className="container py-4 flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4 font-medium">
          <Link to={"/sign-in"}>
            <button className="px-4 py-2 bg-black text-white border rounded capitalize text-sm min-w-28">
              sign in
            </button>
          </Link>
          <Link to={"/sign-up"}>
            <button className="px-4 py-2 border border-neutral-950 text-neutral-950 rounded capitalize text-sm bg-white min-w-20">
              sign up
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
