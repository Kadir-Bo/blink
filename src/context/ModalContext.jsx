import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "hooks";
import { UserSettingsModal } from "components";
import { X } from "react-feather";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [modalContent, setModalContent] = useState(<UserSettingsModal />);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  useOnClickOutside(modalRef, closeModal);

  const value = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998] flex justify-center items-center"
          >
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={` relative z-[9999] bg-white w-full h-full sm:max-w-6xl md:max-h-[70vh] sm:rounded-lg sm:overflow-auto p-4 sm:p-6`}
            >
              <button
                className="absolute right-4 top-4 group"
                onClick={closeModal}
              >
                <X className="group-hover:stroke-gray-600 stroke-gray-400 transition-all" />
              </button>
              {modalContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
