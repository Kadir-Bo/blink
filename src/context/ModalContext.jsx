import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "hooks";
import React, { createContext, useContext, useRef, useState } from "react";
const ModalContext = createContext();
const useModal = () => {
  return useContext(ModalContext);
};

const ModalContextProvider = ({ children }) => {
  const modalRef = useRef(null);
  const modalDuration = 10; // Modal Duration in Seconds
  const [modal, setModal] = useState({
    state: false,
    message: "",
    className: "",
  });
  const handleResetModal = () => {
    setModal({
      state: false,
      message: "",
      className: "",
    });
  };
  const handleSetModal = (modal) => {
    setModal({
      state: modal.state || "",
      message: modal.message || "",
      className: modal.className || "",
    });
    setTimeout(() => {
      handleResetModal();
    }, modalDuration * 1000);
  };
  const values = {
    handleSetModal,
    handleResetModal,
  };
  useOnClickOutside(modalRef, () => handleResetModal());

  const modalVariants = {
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
  // const { handleSetModal } = useModal();
  // const handleModalExample = () => {
  //   const modal = {
  //     state: true,
  //     message: "This is a error",
  //     className: "border-red-500 text-red-500",
  //   };
  //   handleSetModal(modal);
  // };
  return (
    <ModalContext.Provider value={values}>
      {children}
      <AnimatePresence mode="wait">
        {modal.state && (
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute bottom-4 left-1/2 text-center text-sm font-medium border p-4 bg-white rounded-md shadow-md min-w-48 ${
              modal.className
                ? modal.className
                : "border-gray-300 bg-gray-300 text-gray-900"
            }`}
          >
            <p>{modal.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export { useModal, ModalContextProvider };
