import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  sendProfileUpdateOtpVerify,
  sendProfileUpdateOtp,
} from "actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const VerifyModal = ({ isVisible, closeModal }) => {
  const resendInterVal = 60;
  const dispacth = useDispatch();
  const [otpDisabled, setotpDisabled] = useState(true);
  const alert = useAlert();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(resendInterVal);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      // Perform the action when the countdown reaches 0
      doSomething();
      // Optionally reset the countdown and stop it
      // setSeconds(60);
      // setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const doSomething = () => {
    setotpDisabled(false);
  };

  useEffect(() => {
    if (isVisible) {
      setIsActive(true);
    } else {
      setSeconds(resendInterVal);
      setotpDisabled(true);
      setIsActive(false);
    }
  }, [isVisible]);
  const handleResendOtp = () => {
    dispacth(sendProfileUpdateOtp())
      .then(() => {
        alert.success("OTP Resend Successful");
        setSeconds(resendInterVal);
        setIsActive(true);
        setotpDisabled(true);
      })
      .catch((err) => {
        alert.error(typeof err.message === String ? err.message : "");
      });
  };
  const verifyOtp = () => {
    dispacth(sendProfileUpdateOtpVerify({ otpCode: otp }))
      .then((resp) => {
        closeModal(true);
        setOtp("");
        alert.success("OTP Verfy Successful");
      })
      .catch((err) => {
        setOtp("");
        alert.error(
          typeof err.message === String
            ? err.message
            : err.message.otpCode
            ? err.message.otpCode
            : "Network Error"
        );
      });
  };

  return (
    <Modal
      isOpen={isVisible}
      toggle={() => {
        closeModal(false);
      }}
    >
      <ModalHeader
        toggle={() => {
          closeModal(false);
        }}
      >
        Verify Otp
        <br />
        <input
          type="text"
          name="otp"
          className="my-2"
          placeholder="Enter your otp"
          style={{
            width: "200px",
            border: "0.5px solid #eaeaea",
            height: "25px",
            borderRadius: "12px",
          }}
          value={otp}
          maxLength={4}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            closeModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={otpDisabled}
          color="primary"
          onClick={handleResendOtp}
        >
          Resend Otp {seconds > 0 ? seconds : ""}
        </Button>
        <Button color="primary" onClick={verifyOtp}>
          Verify
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyModal;
