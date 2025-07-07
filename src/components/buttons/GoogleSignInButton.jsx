import React from "react";

const GoogleSignInButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border py-2.5 flex justify-center font-medium text-gray-900"
    >
      Continue with Google
    </button>
  );
};

export default GoogleSignInButton;
