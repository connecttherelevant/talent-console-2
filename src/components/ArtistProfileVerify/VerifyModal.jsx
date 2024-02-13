import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { sendProfileUpdateOtpVerify } from "actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const VerifyModal = ({ isVisible, closeModal }) => {
  const dispacth = useDispatch();
  const [otpDisabled, setotpDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const alert = useAlert();
  const [initalzyTimer, setinitalzyTimer] = useState(null);
  const [otp, setOtp] = useState("");

  const verifyOtp = () => {
    dispacth(sendProfileUpdateOtpVerify({ otpCode: otp }))
      .then((resp) => {
        closeModal(true);
        setOtp("");
        alert.success("OTP Verfy Successful");
      })
      .catch((err) => {
        setOtp("");
        alert.error(err.message);
      });
  };

  //   useEffect(() => {
  //     if (timer > 0) {
  //       let data = setInterval(() => {
  //         setinitalzyTimer(data);
  //         setTimer(timer - 1);
  //       }, 1000);
  //     } else {
  //       setotpDisabled(false);
  //     }

  //     return () => {
  //       if (initalzyTimer) {
  //         clearInterval(initalzyTimer);
  //       }
  //       console.log("DIsbales CALLED===== ", isVisible);
  //     };
  //   }, [isVisible]);

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
        {/* <Button disabled={otpDisabled} color="primary" onClick={() => {}}>
          Resend Otp {timer}
        </Button> */}
        <Button color="primary" onClick={verifyOtp}>
          Verify
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyModal;
