import {
  deleteSocialLink,
  updateSocialLink,
  addSocialLinkTTTT,
} from "actions/socialLinkAction";
import { getUser } from "actions/userAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "components/ArtistProfileVerify/ModalContext";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import editICon from "../../assets/img/edit.svg";
const VerifiedSocialConnect = ({
  currentUser,
  handleInputSocialLink,
  deleteImage,
}) => {
  const alert = useAlert();
  const { openModal } = useModal();
  let { user } = useSelector((state) => state.loginData);
  const dispatch = useDispatch();
  const deleteSocialLinkt = async (id) => {
    let result = await openModal();
    if (result)
      dispatch(deleteSocialLink({ id: id }))
        .then(() => {
          alert.success("Deleted successfully");
          dispatch(getUser({ _id: user._id }));
        })
        .catch((err) => {
          alert.error(typeof err.message === String ? err.message : "");
        });
  };
  const [editData, seteditData] = useState({ label: "", url: "" });
  const [editnewModal, seteditnewModal] = useState(false);
  const toggleEditModal = (index) => {
    seteditData(currentUser.socialLink[index]);
    seteditnewModal(!editnewModal);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;

    seteditData({ ...editData, [name]: value });
  };
  const editSocialLinkTT = async () => {
    let result = await openModal();
    if (result)
      dispatch(updateSocialLink({ ...editData, id: editData._id }))
        .then((resp) => {
          dispatch(getUser({ _id: user._id }));
          seteditnewModal(!editnewModal);
          seteditData({ url: "", label: "" });
          alert.success("update successfully");
        })
        .catch((err) => {
          alert.error(typeof err.message === String ? err.message : "");
        });
  };
  const [addnewModal, setaddnewModal] = useState(false);
  const addNewCTRToggle = () => {
    setaddnewModal(!addnewModal);
  };

  const [data, setdata] = useState({
    url: "",
    label: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;

    setdata({ ...data, [name]: value });
  };
  const addNewSocialLink = async () => {
    let result = await openModal();
    if (result)
      dispatch(addSocialLinkTTTT(data))
        .then((resp) => {
          addNewCTRToggle();
          dispatch(getUser({ _id: user._id }));
          setdata({ url: "", label: "" });
          alert.success("added successfully");
        })
        .catch((err) => {
          alert.error(typeof err.message === String ? err.message : "");
        });
  };
  return (
    <div
      className="d-flex flex-wrap align-content-center"
      style={{ padding: "40px 24px" }}
    >
      {currentUser.socialLink?.map((e, index) => {
        return (
          <div
            key={e._id}
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
              disabled
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
              disabled
              maxLength={100}
              required
              onChange={(e) => {
                handleInputSocialLink(e, index);
              }}
            />
            <div style={{ display: "flex" }}>
              <button
                type="button"
                onClick={() => {
                  deleteSocialLinkt(e._id);
                }}
              >
                <span>
                  <img src={deleteImage} alt="" />
                  Delete
                </span>
              </button>{" "}
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  toggleEditModal(index);
                }}
              >
                {" "}
                <img src={editICon} alt="" />
                <span style={{ color: "#b8bbc6" }}>Edit</span>
              </button>
            </div>
          </div>
        );
      })}
      <div className="add-new-div d-flex justify-content-center align-content-center w-100">
        <button
          onClick={addNewCTRToggle}
          className="addnewbutton"
          type="button"
        >
          Add New
        </button>
      </div>
      <Modal
        isOpen={editnewModal}
        toggle={() => {
          seteditnewModal(!editnewModal);
        }}
      >
        <ModalHeader
          toggle={() => {
            seteditnewModal(!editnewModal);
          }}
        >
          Update
        </ModalHeader>
        <ModalBody>
          <center>
            <div
              className="single-connect-the-relevent d-flex flex-column"
              style={{
                height: "150px",
              }}
            >
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={20}
                style={{ color: "#2E7DE0" }}
                list="SociallabelOptions"
                name="label"
                required
                value={editData.label}
                onChange={handleChangeEdit}
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
                value={editData.url}
                maxLength={100}
                required
                onChange={handleChangeEdit}
              />
            </div>{" "}
          </center>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              seteditnewModal(!editnewModal);
            }}
          >
            Cancel
          </Button>
          <Button color="success" onClick={editSocialLinkTT}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={addnewModal}
        toggle={() => {
          setaddnewModal(!addnewModal);
        }}
      >
        <ModalHeader
          toggle={() => {
            setaddnewModal(!addnewModal);
          }}
        >
          Add
        </ModalHeader>
        <ModalBody>
          <center>
            <div
              className="single-connect-the-relevent d-flex flex-column"
              style={{
                height: "150px",
              }}
            >
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={20}
                style={{ color: "#2E7DE0" }}
                list="SociallabelOptions"
                name="label"
                required
                value={data.label}
                onChange={handleChange}
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
                value={data.url}
                maxLength={100}
                required
                onChange={handleChange}
              />
            </div>{" "}
          </center>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setaddnewModal(!addnewModal);
            }}
          >
            Cancel
          </Button>
          <Button color="success" onClick={addNewSocialLink}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerifiedSocialConnect;
