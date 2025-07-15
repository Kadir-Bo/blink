import { useOnClickOutside } from "hooks";
import React, { useRef, useState, useEffect } from "react";
import { useDatabase } from "context";
import clsx from "clsx";

const CreateTask = ({ refetchTasks }) => {
  const { createTask } = useDatabase();
  const [isFocused, setIsFocused] = useState(false);
  const inputContainerRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useOnClickOutside(inputContainerRef, () => handleRemoveFocus());

  const handleAddFocus = () => setIsFocused(true);

  const handleRemoveFocus = async () => {
    if (description.trim() || title.trim()) {
      await createTask({ title, description });
      await refetchTasks?.();
    }
    setIsFocused(false);
    setTitle("");
    setDescription("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRemoveFocus();
    }
  };
  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    autoResize(document.getElementById("title"));
  }, [title]);

  useEffect(() => {
    autoResize(document.getElementById("description"));
  }, [description]);

  return (
    <div
      className={clsx(
        "flex items-center gap-2 w-full max-w-[520px] mx-auto border border-gray-300 bg-white shadow-sm overflow-hidden rounded-lg outline-none"
      )}
      ref={inputContainerRef}
    >
      {isFocused ? (
        <div className="w-full">
          <textarea
            name="title"
            id="title"
            placeholder="Title"
            className="py-2 px-4 w-full outline-none text-xl placeholder:text-neutral-600 placeholder:font-medium font-medium text-neutral-900 resize-none overflow-hidden"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            rows={1}
            autoFocus={true}
            onKeyDown={handleKeyDown}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Write note..."
            className="resize-none overflow-hidden w-full outline-none py-2 px-4 placeholder:text-md placeholder:text-neutral-600 text-neutral-900"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={1}
          ></textarea>
          <div className="px-4 py-2 w-full flex justify-end text-sm font-medium text-gray-500 hover:text-gray-800">
            <button onClick={handleRemoveFocus}>close</button>
          </div>
        </div>
      ) : (
        <input
          type="text"
          name="new-note"
          id="new-note"
          placeholder="Write Note"
          className="py-2 px-4 w-full outline-none text-lg text-gray-900"
          onFocus={handleAddFocus}
        />
      )}
    </div>
  );
};

export default CreateTask;
