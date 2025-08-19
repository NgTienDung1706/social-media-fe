import { createContext, useContext, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal"; // đường dẫn đúng của bạn

const ConfirmModalContext = createContext();

export const ConfirmModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const openConfirm = (title, message, onConfirm) => {
    setModalData({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeConfirm = () => {
    setModalData((prev) => ({ ...prev, open: false }));
  };

  return (
    <ConfirmModalContext.Provider value={{ openConfirm, closeConfirm }}>
      {children}
      <ConfirmModal
        open={modalData.open}
        title={modalData.title}
        message={modalData.message}
        onCancel={closeConfirm}
        onConfirm={() => {
          modalData.onConfirm();
          closeConfirm();
        }}
      />
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = () => useContext(ConfirmModalContext);
