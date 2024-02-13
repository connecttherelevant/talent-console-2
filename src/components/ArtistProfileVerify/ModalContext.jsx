import React, { createContext, useContext, useState } from "react";
import VerifyModal from "./VerifyModal";
import { sendProfileUpdateOtp } from "actions/userAction";
import { useDispatch } from "react-redux";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [resolvePromise, setResolvePromise] = useState();
  const dispacth = useDispatch();
  const openModal = () => {
    setIsVisible(true);
    dispacth(sendProfileUpdateOtp());
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const closeModal = (result) => {
    setIsVisible(false);
    if (resolvePromise) {
      resolvePromise(result);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <VerifyModal isVisible={isVisible} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};
