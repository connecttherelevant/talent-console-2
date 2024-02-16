import React, { createContext, useContext, useState } from "react";
import VerifyModal from "./VerifyModal";
import { sendProfileUpdateOtp } from "actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const alert = useAlert();
  const [resolvePromise, setResolvePromise] = useState();
  const dispacth = useDispatch();
  const openModal = () => {
    dispacth(sendProfileUpdateOtp())
      .then(() => {
        setIsVisible(true);
      })
      .catch((err) => {
        alert.error(
          typeof err.message === "string"
            ? err.message
            : err.message.otpCode
            ? err.message.otpCode
            : "Network Error"
        );
      });

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
