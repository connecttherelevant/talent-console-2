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
        <label htmlFor="">Note: Description Goes here</label>
      </div>
    </div>
  );
};

export default PressKit;
