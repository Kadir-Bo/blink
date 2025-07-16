import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "hooks";
import React, { createContext, useContext, useRef, useState } from "react";
const UserMessageContext = createContext();
const useUserMessage = () => {
  return useContext(UserMessageContext);
};

const UserMessageContextProvider = ({ children }) => {
  const UserMessageRef = useRef(null);
  const UserMessageDuration = 10; // UserMessage Duration in Seconds
  const [UserMessage, setUserMessage] = useState({
    state: false,
    message: "",
    className: "",
  });
  const handleResetUserMessage = () => {
    setUserMessage({
      state: false,
      message: "",
      className: "",
    });
  };
  const handleSetUserMessage = (UserMessage) => {
    setUserMessage({
      state: UserMessage.state || "",
      message: UserMessage.message || "",
      className: UserMessage.className || "",
    });
    setTimeout(() => {
      handleResetUserMessage();
    }, UserMessageDuration * 1000);
  };
  const values = {
    handleSetUserMessage,
    handleResetUserMessage,
  };
  useOnClickOutside(UserMessageRef, () => handleResetUserMessage());

  const UserMessageVariants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50,
    },
  };

  // USAGE:
  // const { handleSetUserMessage } = useUserMessage();
  // const handleUserMessageExample = () => {
  //   const UserMessage = {
  //     state: true,
  //     message: "This is a error",
  //     className: "border-red-500 text-red-500",
  //   };
  //   handleSetUserMessage(UserMessage);
  // };
  return (
    <UserMessageContext.Provider value={values}>
      {children}
      <AnimatePresence mode="wait">
        {UserMessage.state && (
          <motion.div
            ref={UserMessageRef}
            variants={UserMessageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute bottom-4 left-1/2 text-center text-sm font-medium border p-4 bg-white rounded-md shadow-md min-w-48 ${
              UserMessage.className
                ? UserMessage.className
                : "border-gray-300 bg-gray-300 text-gray-900"
            }`}
          >
            <p>{UserMessage.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </UserMessageContext.Provider>
  );
};

export { useUserMessage, UserMessageContextProvider };
