import { editConnect } from "actions/connectTheReleventAction";
import { deleteConnect } from "actions/connectTheReleventAction";
import { addConnect } from "actions/connectTheReleventAction";
import { getUser } from "actions/userAction";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useModal } from "../ArtistProfileVerify/ModalContext";
import editICon from "../../assets/img/edit.svg";
const ConnectTheRelevant = ({
  currentUser,
  handleInputChangeConnectTheRelevent,
  deleteImage,
}) => {
  const { openModal } = useModal();
  let { user } = useSelector((state) => state.loginData);
  const alert = useAlert();
  const dispatch = useDispatch();
  const [addnewModal, setaddnewModal] = useState(false);
  const addNewCTRToggle = () => {
    setaddnewModal(!addnewModal);
  };

  const [data, setdata] = useState({
    name: "",
    number: "",
    label: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;

    setdata({ ...data, [name]: value });
  };
  const [editData, seteditData] = useState({ name: "", label: "", number: "" });
  const [editnewModal, seteditnewModal] = useState(false);
  const toggleEditModal = (index) => {
    seteditData(currentUser.managementConnect[index]);
    seteditnewModal(!editnewModal);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;

    seteditData({ ...editData, [name]: value });
  };
  const addCtr = async () => {
    let result = await openModal();
    if (result)
      dispatch(addConnect(data))
        .then((resp) => {
          dispatch(getUser({ _id: user._id }));
          addNewCTRToggle();
          alert.success("added successfully");
        })
        .catch((err) => {
          alert.error(err.message);
        });
  };
  const editCtr = async () => {
    let result = await openModal();
    if (result)
      dispatch(editConnect({ ...editData, id: editData._id }))
        .then((resp) => {
          dispatch(getUser({ _id: user._id }));
          seteditnewModal(!editnewModal);
          seteditData({ name: "", label: "", number: "" });
          alert.success("update successfully");
        })
        .catch((err) => {
          alert.error(err.message);
        });
  };
  const deleteCtr = async (id) => {
    let result = await openModal();
    if (result)
      dispatch(deleteConnect({ id }))
        .then((resp) => {
          dispatch(getUser({ _id: user._id }));

          alert.success("Deleted successfully");
        })
        .catch((err) => {
          alert.error(err.message);
        });
  };
  return (
    <div>
      {" "}
      <div
        className="d-flex flex-wrap align-content-center"
        style={{ padding: "40px 24px" }}
      >
        {currentUser &&
          currentUser.managementConnect?.map((e, index) => {
            return (
              <div
                key={index}
                className="single-connect-the-relevent d-flex flex-column"
              >
                <label htmlFor="label">Label</label>
                <input
                  type="text"
                  id="label"
                  maxLength={40}
                  style={{ color: "#2E7DE0" }}
                  list="labelOptions"
                  value={e.label}
                  name="label"
                  required
                  disabled
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
                  maxLength={40}
                  disabled
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
                  disabled
                  required
                  onChange={(e) => {
                    handleInputChangeConnectTheRelevent(e, index);
                  }}
                />
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={() => {
                      deleteCtr(e._id);
                    }}
                  >
                    {" "}
                    <img src={deleteImage} alt="" />
                    <span>Delete</span>
                  </button>
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
          <button type="button" onClick={addNewCTRToggle}>
            Add New
          </button>
        </div>
      </div>
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
                height: "200px",
              }}
            >
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={40}
                style={{ color: "#2E7DE0" }}
                list="labelOptions"
                name="label"
                required
                onChange={handleChange}
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
                maxLength={40}
                name="name"
                onChange={handleChange}
                required
              />
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                name="number"
                maxLength={10}
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
          <Button color="success" onClick={addCtr}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
      {/* //todo edit this */}
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
                height: "200px",
              }}
            >
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={40}
                style={{ color: "#2E7DE0" }}
                list="labelOptions"
                name="label"
                required
                value={editData.label}
                onChange={handleChangeEdit}
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
                maxLength={40}
                name="name"
                value={editData.name}
                onChange={handleChangeEdit}
                required
              />
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                name="number"
                maxLength={10}
                value={editData.number}
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
          <Button color="success" onClick={editCtr}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConnectTheRelevant;
