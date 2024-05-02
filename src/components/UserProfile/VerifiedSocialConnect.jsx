import {
  deleteSocialLink,
  updateSocialLink,
  addSocialLinkTTTT,
} from "actions/socialLinkAction";
import { getUser } from "actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "components/ArtistProfileVerify/ModalContext";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

import editICon from "../../assets/img/edit.svg";

import Config from "../../Config";
const VerifiedSocialConnect = ({
  currentUser,
  handleInputSocialLink,
  deleteImage,
}) => {
  const alert = useAlert();
  const { openModal } = useModal();
  let { user } = useSelector((state) => state.loginData);
  const [labelOrder, setlabelOrder] = useState([]);
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
          alert.error(typeof err.message === "string" ? err.message : "");
        });
  };
  const [editData, seteditData] = useState({ label: "", url: "" });
  const [editnewModal, seteditnewModal] = useState(false);
  const toggleEditModal = (index, type) => {
    let typeData = currentUser.socialLink.filter((e) => e.type == type);
    seteditData(typeData[index]);
    seteditnewModal(!editnewModal);
  };
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;

    seteditData({ ...editData, [name]: value });
  };
  const editSocialLinkTT = async () => {
    let result = await openModal();
    if (result) {
      let obj = { ...editData };
      let res = labelOrder.find((e) => e.label === obj.label);
      obj.type = res ? res.type : "other";
      dispatch(updateSocialLink({ ...obj, id: editData._id }))
        .then((resp) => {
          dispatch(getUser({ _id: user._id }));
          seteditnewModal(!editnewModal);
          seteditData({ url: "", label: "" });
          alert.success("update successfully");
        })
        .catch((err) => {
          alert.error(typeof err.message === "string" ? err.message : "");
        });
    }
  };
  const [addnewModal, setaddnewModal] = useState(false);
  const addNewCTRToggle = () => {
    setaddnewModal(!addnewModal);
  };

  const [data, setdata] = useState({
    url: "",
    label: "",
    type: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;

    setdata({ ...data, [name]: value });
  };
  const addNewSocialLink = async (type) => {
    let result = await openModal();
    if (result) {
      let obj = { ...data };
      let res = labelOrder.find((e) => e.label === obj.label);
      obj.type = res ? res.type : "other";
      dispatch(addSocialLinkTTTT(obj))
        .then((resp) => {
          addNewCTRToggle();
          dispatch(getUser({ _id: user._id }));
          setdata({ url: "", label: "" });
          alert.success("added successfully");
        })
        .catch((err) => {
          alert.error(typeof err.message === "string" ? err.message : "");
        });
    }
  };
  useEffect(() => {
    axios
      .post(`${Config.BASE_URL}sociallink/list`, {
        filter: { status: { $in: [1] } },
      })
      .then((resp) => {
        setlabelOrder(resp.data.data);
      });
  }, []);
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <div
      className="d-flex flex-wrap align-content-center"
      style={{ padding: "20px 0px" }}
    >
      <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Audio Streaming</Accordion.Header>
          <Accordion.Body style={{ width: "100%", display: "flex" }}>
            {currentUser.socialLink
              ?.filter((e, index) => e.type === "streaming")
              .map((e, index) => {
                return (
                  <div
                    key={e._id}
                    className="single-connect-the-relevent d-flex flex-column"
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
                      {labelOrder
                        .filter((e) => e.type === "streaming")
                        .map((e) => {
                          return <option value={e.label}></option>;
                        })}
                    </datalist>
                    <label htmlFor="link" style={{ paddingTop: "15px" }}>
                      Link
                    </label>
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
                          toggleEditModal(index, "streaming");
                        }}
                      >
                        {" "}
                        <img src={editICon} alt="" />
                        <span style={{ color: "#b8bbc6", paddingLeft: "5px" }}>
                          Edit
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Social Media</Accordion.Header>
          <Accordion.Body style={{ width: "100%", display: "flex" }}>
            {currentUser.socialLink
              ?.filter((e, index) => e.type === "social")
              .map((e, index) => {
                return (
                  <div
                    key={e._id}
                    className="single-connect-the-relevent d-flex flex-column"
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
                      {labelOrder
                        .filter((e) => e.type === "social")
                        .map((e) => {
                          return <option value={e.label}></option>;
                        })}
                    </datalist>
                    <label htmlFor="link" style={{ paddingTop: "15px" }}>
                      Link
                    </label>
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
                          toggleEditModal(index, "social");
                        }}
                      >
                        {" "}
                        <img src={editICon} alt="" />
                        <span style={{ color: "#b8bbc6", paddingLeft: "5px" }}>
                          Edit
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Other Links</Accordion.Header>
          <Accordion.Body style={{ width: "100%", display: "flex" }}>
            {currentUser.socialLink
              ?.filter((e, index) => e.type === "other")
              .map((e, index) => {
                return (
                  <div
                    key={e._id}
                    className="single-connect-the-relevent d-flex flex-column"
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
                      {labelOrder
                        .filter((e) => e.type === "other")
                        .map((e) => {
                          return <option value={e.label}></option>;
                        })}
                    </datalist>
                    <label htmlFor="link" style={{ paddingTop: "15px" }}>
                      Link
                    </label>
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
                          toggleEditModal(index, "other");
                        }}
                      >
                        {" "}
                        <img src={editICon} alt="" />
                        <span style={{ color: "#b8bbc6", paddingLeft: "5px" }}>
                          Edit
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div
        className="add-new-div d-flex justify-content-center align-content-center w-100"
        style={{ paddingTop: "20px" }}
      >
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
          <div
            style={{ fontSize: "18px", color: "#2e7ce0", fontWeight: "600" }}
          >
            Update {editData.label}
          </div>
        </ModalHeader>
        <ModalBody>
          <center>
            <div className="single-connect-the-relevent d-flex flex-column">
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={20}
                style={{ color: "#2E7DE0" }}
                list="SociallabelOptions22"
                name="label"
                required
                value={editData.label}
                onChange={handleChangeEdit}
              />
              <datalist id="SociallabelOptions22">
                {labelOrder.map((e) => {
                  return <option value={e.label}></option>;
                })}
              </datalist>
              <label htmlFor="link" style={{ paddingTop: "15px" }}>
                Link
              </label>
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
            color="success"
            style={{
              background: "#2e7ce0",
            }}
            onClick={editSocialLinkTT}
          >
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
          <div
            style={{ fontSize: "18px", color: "#2e7ce0", fontWeight: "600" }}
          >
            Add {data.label}
          </div>
        </ModalHeader>
        <ModalBody>
          <center>
            <div className="single-connect-the-relevent d-flex flex-column">
              <label htmlFor="label">Label</label>
              <input
                type="text"
                id="label"
                maxLength={20}
                style={{ color: "#2E7DE0" }}
                list="SociallabelOptions2"
                name="label"
                required
                value={data.label}
                onChange={handleChange}
              />
              <datalist id="SociallabelOptions2">
                {labelOrder.map((e) => {
                  return <option value={e.label}></option>;
                })}
              </datalist>
              <label htmlFor="link" style={{ paddingTop: "15px" }}>
                Link
              </label>
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
            color="success"
            style={{
              background: "#2e7ce0",
            }}
            onClick={addNewSocialLink}
          >
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerifiedSocialConnect;
