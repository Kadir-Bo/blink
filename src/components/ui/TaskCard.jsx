import React, { useState, useRef } from "react";
import { Archive, Check, Edit, Trash2, RotateCcw } from "react-feather"; // RotateCcw als Restore Icon
import { useDatabase, useLayout } from "context";
import { motion } from "framer-motion";
import clsx from "clsx";

const TaskCard = ({ task, refetchTasks }) => {
  const { id, title, description, status } = task;
  const { updateTask, deleteTask } = useDatabase();
  const { columnView } = useLayout();

  // Editable states
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [saving, setSaving] = useState(false);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const saveChanges = async (newTitle, newDescription) => {
    if (newTitle.trim() === "" && newDescription.trim() === "") return;
    if (newTitle !== title || newDescription !== description) {
      setSaving(true);
      try {
        await updateTask(id, { title: newTitle, description: newDescription });
        refetchTasks();
      } catch (err) {
        console.error("Failed to update task:", err);
      }
      setSaving(false);
    }
  };

  const onTitleBlur = () => {
    const newTitle = titleRef.current.innerText;
    setEditableTitle(newTitle);
    saveChanges(newTitle, editableDescription);
  };

  const onDescBlur = () => {
    const newDescription = descRef.current.innerText;
    setEditableDescription(newDescription);
    saveChanges(editableTitle, newDescription);
  };

  // Button Handler
  const handleArchiveClick = async () => {
    if (status === "archived") {
      // Entarchivieren -> pending
      await updateTask(id, { status: "pending" });
    } else if (status === "deleted") {
      // Wiederherstellen aus Papierkorb -> pending
      await updateTask(id, { status: "pending" });
    } else {
      // Archivieren
      await updateTask(id, { status: "archived" });
    }
    refetchTasks();
  };

  const handleDeleteClick = async () => {
    if (status === "deleted") {
      // Endgültig löschen
      await deleteTask(id);
    } else {
      // In Papierkorb verschieben
      await updateTask(id, { status: "deleted" });
    }
    refetchTasks();
  };

  const handleToggleCompleted = async () => {
    if (status === "completed") {
      await updateTask(id, { status: "pending" });
    } else if (status === "pending") {
      await updateTask(id, { status: "completed" });
    }
    refetchTasks();
  };

  const handleChangeAppearance = async () => {
    // Simple toggle pending <-> completed for appearance
    const newStatus = status === "pending" ? "completed" : "pending";
    await updateTask(id, { status: newStatus });
    refetchTasks();
  };

  // Dynamische Buttons je nach Status
  const TaskActions = [];

  // Archivieren / Entarchivieren / Wiederherstellen Button
  if (status === "archived") {
    TaskActions.push({
      id: "unarchive",
      icon: RotateCcw,
      onClick: handleArchiveClick,
      ariaLabel: "Unarchive task",
      title: "Unarchive",
    });
  } else if (status === "deleted") {
    TaskActions.push({
      id: "restore",
      icon: RotateCcw,
      onClick: handleArchiveClick,
      ariaLabel: "Restore task",
      title: "Restore",
    });
  } else {
    TaskActions.push({
      id: "archive",
      icon: Archive,
      onClick: handleArchiveClick,
      ariaLabel: "Archive task",
      title: "Archive",
    });
  }

  // Delete Button
  TaskActions.push({
    id: "delete",
    icon: Trash2,
    onClick: handleDeleteClick,
    ariaLabel: status === "deleted" ? "Permanently delete task" : "Delete task",
    title: status === "deleted" ? "Delete permanently" : "Delete",
  });

  // Nur aktiv, wenn nicht archiviert oder gelöscht: Appearance & Check Buttons
  if (status !== "archived" && status !== "deleted") {
    TaskActions.push(
      {
        id: "appearance",
        icon: Edit,
        onClick: handleChangeAppearance,
        ariaLabel: "Change appearance",
        title: "Change appearance",
      },
      {
        id: "check",
        icon: Check,
        onClick: handleToggleCompleted,
        ariaLabel:
          status === "completed" ? "Mark as pending" : "Mark as completed",
        title: status === "completed" ? "Mark as pending" : "Mark as completed",
      }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: status === "completed" ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.12 }}
      className={clsx(
        "bg-white rounded-md p-4 min-w-72 w-full flex flex-col justify-between gap-4 pb-2 border",
        columnView ? "max-w-[520px]" : "max-w-[320px]"
      )}
    >
      <div>
        <h3
          ref={titleRef}
          contentEditable={!saving && status !== "deleted"}
          suppressContentEditableWarning={true}
          onBlur={onTitleBlur}
          className={clsx(
            "text-lg font-semibold outline-none cursor-text",
            status === "deleted" ? "line-through text-gray-400" : ""
          )}
          spellCheck={false}
          role="textbox"
          aria-label="Edit task title"
          tabIndex={status === "deleted" ? -1 : 0}
        >
          {editableTitle}
        </h3>
        <p
          ref={descRef}
          contentEditable={!saving && status !== "deleted"}
          suppressContentEditableWarning={true}
          onBlur={onDescBlur}
          className={clsx(
            "text-sm text-gray-700 outline-none cursor-text whitespace-pre-wrap",
            status === "deleted" ? "line-through text-gray-400" : ""
          )}
          spellCheck={false}
          role="textbox"
          aria-label="Edit task description"
          tabIndex={status === "deleted" ? -1 : 0}
        >
          {editableDescription}
        </p>
      </div>

      <ul className="flex items-center justify-start gap-1 flex-wrap">
        {TaskActions.map(({ id, icon: Icon, onClick, ariaLabel, title }) => (
          <li key={id}>
            <button
              onClick={onClick}
              className="outline-none flex items-center justify-center p-2 hover:bg-gray-100 rounded"
              aria-label={ariaLabel}
              title={title}
            >
              <Icon size={17} />
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TaskCard;
