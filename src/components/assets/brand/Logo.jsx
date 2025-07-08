import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="text-xl font-bold flex-shrink-0">
      Blink tasks
    </Link>
  );
};

export default Logo;
