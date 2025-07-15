import React, { useEffect, useState } from "react";
import { TaskCard } from "components";
import { useDatabase } from "context";

const DashboardTrash = () => {
  const { readTasks, deleteTask } = useDatabase();
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const fetchTrashedTasks = async () => {
    setLoading(true);
    try {
      const tasks = await readTasks();
      setTrashedTasks(tasks.filter((t) => t.status === "deleted"));
    } catch (error) {
      console.error("Failed to load trashed tasks", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrashedTasks();
  }, []);

  const handleClearTrash = async () => {
    if (trashedTasks.length === 0) return;

    if (
      !window.confirm(
        "Are you sure you want to permanently delete all trashed tasks?"
      )
    ) {
      return;
    }

    setClearing(true);
    try {
      // Delete all trashed tasks one by one
      await Promise.all(trashedTasks.map((task) => deleteTask(task.id)));
      await fetchTrashedTasks();
    } catch (error) {
      console.error("Failed to clear trash:", error);
    }
    setClearing(false);
  };

  if (trashedTasks.length === 0) {
    return (
      <div className="h-full flex items-start justify-center pt-32 text-gray-400">
        <p className="text-lg">No deleted tasks found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-4">
          <p className="text-lg font-light">
            Tasks will be automatically deleted after 7 days.
          </p>
          <button
            className="text-blue-500"
            onClick={handleClearTrash}
            disabled={clearing}
          >
            {clearing ? "Clearing..." : "Clear Trash"}
          </button>
        </div>
      </div>
      {trashedTasks.map((task) => (
        <TaskCard key={task.id} task={task} refetchTasks={fetchTrashedTasks} />
      ))}
    </div>
  );
};

export default DashboardTrash;
