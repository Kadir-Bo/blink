import React, { useEffect, useState } from "react";
import { CreateTask, TaskCard } from "components";
import { useDatabase, useLayout } from "context";
import { AnimatePresence } from "framer-motion";

const DashboardTasks = () => {
  const { readTasks } = useDatabase();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { columnView, searchQuery } = useLayout(); // get searchQuery here

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await readTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [readTasks]);

  // Filter tasks based on searchQuery and status
  const filteredTasks = tasks.filter(
    (task) =>
      task.status !== "archived" &&
      task.status !== "deleted" &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={`p-4 ${columnView ? "max-w-[540px] mx-auto" : ""}`}>
      <CreateTask refetchTasks={fetchTasks} />
      <div
        className={`flex flex-wrap gap-6 my-6 ${
          columnView ? "flex-col items-center" : "flex-row"
        }`}
      >
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard task={task} key={task.id} refetchTasks={fetchTasks} />
          ))}
        </AnimatePresence>
      </div>
      {loading && <p>Loading tasks...</p>}
      {!loading && filteredTasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default DashboardTasks;
