import React from "react";

const PressKit = ({ currentUser, setcurrentUser }) => {
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "40px 24px",
        }}
      >
        <label htmlFor="presskit">Email ID to receive Press Kit Requests</label>
        <input
          type="email"
          maxLength={30}
          className="pressKit"
          value={currentUser.pressKitEmailId}
          onChange={(e) => {
            setcurrentUser({
              ...currentUser,
              pressKitEmailId: e.target.value,
            });
          }}
        />
        <label htmlFor="" style={{fontStyle: "italic"}}>Note: Industry Professionals can Request Your Official Press Kit via email, Please provide valid email id of the person who handles Your Press Kit.</label>
      </div>
    </div>
  );
};

export default PressKit;
