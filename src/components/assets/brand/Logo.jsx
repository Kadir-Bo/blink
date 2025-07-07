import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="text-xl font-bold">
      Blink Notes
    </Link>
  );
};

export default Logo;
