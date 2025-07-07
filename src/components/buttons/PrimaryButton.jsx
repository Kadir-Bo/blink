import React from "react";
import { ChevronRight } from "react-feather";
import clsx from "clsx";

const PrimaryButton = ({
  type = "button",
  onClick,
  text = "Primary Button",
  icon = <ChevronRight size={21} />,
  iconPosition = "right", // left | right
  className = "",
  disabled = false,
  loading = false,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      className={clsx(
        "flex items-center justify-center gap-1 w-full min-w-28 px-4 py-2.5 border rounded font-medium",
        "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{text}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
