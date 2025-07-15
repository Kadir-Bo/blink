import React, { useEffect, useState } from "react";
import { TaskCard } from "components";
import { useDatabase, useLayout } from "context";
import { AnimatePresence } from "framer-motion";

const DashboardArchive = () => {
  const { readTasks } = useDatabase();
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { columnView } = useLayout();

  const fetchArchivedTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await readTasks();
      setArchivedTasks(
        fetchedTasks.filter((task) => task.status === "archived")
      );
    } catch (err) {
      console.error("Error loading archived tasks:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArchivedTasks();
  }, [readTasks]);

  if (archivedTasks.length === 0) {
    return (
      <div className="h-full flex items-start justify-center pt-32 text-gray-400">
        <p className="text-lg">No archived tasks found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Archived Tasks</h2>
      <div
        className={`flex flex-wrap gap-6 my-6 ${
          columnView ? "flex-col items-center" : "flex-row"
        }`}
      >
        <AnimatePresence>
          {archivedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              refetchTasks={fetchArchivedTasks}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardArchive;
