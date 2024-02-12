import React from "react";

const VerifiedSocialConnect = ({
  currentUser,
  handleInputSocialLink,
  deleteSocialLinkt,
  deleteImage,
  addNewSocialLink,
}) => {
  return (
    <div
      className="d-flex flex-wrap align-content-center"
      style={{ padding: "40px 24px" }}
    >
      {currentUser.socialLink.map((e, index) => {
        return (
          <div
            className="single-connect-the-relevent d-flex flex-column"
            style={{ height: "200px" }}
          >
            <label htmlFor="label">Label</label>
            <input
              type="text"
              id="label"
              maxLength={20}
              style={{ color: "#2E7DE0" }}
              list="SociallabelOptions"
              name="label"
              value={e.label}
              required
              onChange={(e) => {
                handleInputSocialLink(e, index);
              }}
            />
            <datalist id="SociallabelOptions">
              <option value="Facebook"></option>
              <option value="Twitter"></option>
              <option value="Instagram"></option>
              <option value="Youtube"></option>
              <option value="Wikipedia"></option>
              <option value="Snapchat"></option>
            </datalist>
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="url"
              id="link"
              value={e.url}
              maxLength={100}
              required
              onChange={(e) => {
                handleInputSocialLink(e, index);
              }}
            />

            <button
              type="button"
              onClick={() => {
                deleteSocialLinkt(index);
              }}
            >
              <span>
                <img src={deleteImage} alt="" />
                Delete
              </span>
            </button>
          </div>
        );
      })}
      <div className="add-new-div d-flex justify-content-center align-content-center w-100">
        <button
          onClick={addNewSocialLink}
          className="addnewbutton"
          type="button"
        >
          Add New
        </button>
      </div>
    </div>
  );
};

export default VerifiedSocialConnect;
