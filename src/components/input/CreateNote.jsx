import React from "react";

const CreateNote = () => {
  return (
    <div className="flex items-center gap-2 w-full max-w-[540px] mx-auto border-2 rounded-lg outline-none">
      <input
        type="text"
        name="new-item"
        id="new-item"
        placeholder="Add Item"
        className="py-2 px-4 w-full outline-none"
      />
      <div></div>
    </div>
  );
};

export default CreateNote;
