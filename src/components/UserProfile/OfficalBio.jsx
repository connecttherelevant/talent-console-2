import React from "react";

const OfficalBio = ({ setcurrentUser, currentUser }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "40px 24px",
      }}
    >
      <label htmlFor="bio"> Bio</label>
      <textarea
        name="bio"
        id="bio"
        cols="30"
        rows="10"
        value={currentUser.about}
        onChange={(e) => {
          setcurrentUser({
            ...currentUser,
            about: e.target.value,
          });
        }}
      ></textarea>
    </div>
  );
};

export default OfficalBio;
