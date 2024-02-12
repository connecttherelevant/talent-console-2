import React from "react";

const ConnectTheRelevant = ({
  currentUser,
  handleInputChangeConnectTheRelevent,
  deleteImage,
  deleteConnectTheRelevent,
  addNewConnectTheRelevent,
}) => {
  return (
    <div>
      {" "}
      <div
        className="d-flex flex-wrap align-content-center"
        style={{ padding: "40px 24px" }}
      >
        {currentUser.managementConnect.map((e, index) => {
          return (
            <div className="single-connect-the-relevent d-flex flex-column">
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={20}
                style={{ color: "#2E7DE0" }}
                list="labelOptions"
                value={e.label}
                name="label"
                required
                onChange={(e) => {
                  handleInputChangeConnectTheRelevent(e, index);
                }}
              />
              <datalist id="labelOptions">
                <option value="Shows & Events"></option>
                <option value="Recordings"></option>
                <option value="Endorsements"></option>
                <option value="Social Media Management"></option>
                <option value="Public Relations"></option>
              </datalist>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                maxLength={20}
                value={e.name}
                name="name"
                onChange={(e) => {
                  handleInputChangeConnectTheRelevent(e, index);
                }}
                required
              />
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                name="number"
                maxLength={10}
                value={e.number}
                required
                onChange={(e) => {
                  handleInputChangeConnectTheRelevent(e, index);
                }}
              />
              <button type="button">
                <span
                  onClick={() => {
                    deleteConnectTheRelevent(index);
                  }}
                >
                  <img src={deleteImage} alt="" />
                  Delete
                </span>
              </button>
            </div>
          );
        })}
        <div className="add-new-div d-flex justify-content-center align-content-center w-100">
          <button type="button" onClick={addNewConnectTheRelevent}>
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectTheRelevant;
