import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import { Archive, Feather, Trash } from "react-feather";
const Sidebar = ({ isVisible, handleComponent }) => {
  const Items = [
    {
      id: "tasks",
      name: "tasks",
      icon: Feather,
    },
    {
      id: "archive",
      name: "archive",
      icon: Archive,
    },
    {
      id: "trash",
      name: "trash",
      icon: Trash,
    },
  ];
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.nav
          key="sidebar"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.1 }}
          className="h-screen max-w-[240px] pt-16 w-full"
        >
          <ul className="w-full h-full border flex flex-col gap-1 p-2">
            {Items.map((item) => (
              <li
                key={item.id}
                className="px-4 py-3 pl-6 hover:bg-gray-50 rounded-full flex items-center gap-2 capitalize text-neutral-950 font-medium cursor-pointer"
                onClick={() => handleComponent(item.id)}
              >
                <item.icon size={18} />
                {item.name}
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
