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
      doSomething();
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
        alert.error(typeof err.message === "string" ? err.message : "");
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
          typeof err.message === "string"
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
        <div
          style={{
            fontSize: "18px",
            color: "#2e7ce0",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          Verify OTP
        </div>
        <br />
        <input
          type="text"
          name="otp"
          className="my-2"
          placeholder="Enter your otp"
          style={{
            width: "200px",
            border: "0.5px solid #eaeaea",
            height: "46px",
            borderRadius: "8px",
            padding: "10px",
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
          style={{
            background: "none",
            color: "#979797",
            border: "1px solid #eaeaea",
            boxShadow: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={otpDisabled}
          color="primary"
          style={{
            background: "#2e7ce0",
          }}
          onClick={handleResendOtp}
        >
          Resend Otp {seconds > 0 ? seconds : ""}
        </Button>
        <Button
          color="primary"
          style={{
            background: "#2e7ce0",
          }}
          onClick={verifyOtp}
        >
          Verify
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyModal;
