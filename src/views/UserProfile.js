import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
} from "reactstrap";
import "../assets/css/user-profile.css";
import deleteImage from "../assets/img/delete-svgrepo-com 1.svg";
import { getUser, updateProfile } from "actions/userAction";
import Config from "../Config";

function UserProfile() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let { user, error } = useSelector((state) => state.loginData);
  const [currentUser, setcurrentUser] = useState(user ? user : null);
  useEffect(() => {
    if (currentUser)
      dispatch(getUser({ _id: currentUser._id }))
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          alert.error(err.message);
        });
  }, []);

  useEffect(() => {
    setcurrentUser(user);
  }, [user]);
  let tabsData = [
    "Account Information",
    "Connect The Relevant",
    "Official Bio",
    "Verified Social Connect",
    "Request Official Press Kit",
  ];
  const [activeTab, setactiveTab] = useState(tabsData[0]);
  const handleActive = (e) => {
    setactiveTab(e);
  };
  const handleInputChangeConnectTheRelevent = (event, index) => {
    const { value, name } = event.target;

    let oldData = currentUser.managementConnect;
    if (Array.isArray(oldData)) {
      oldData[index][name] = value;
      setcurrentUser({ ...currentUser, managementConnect: oldData });
    }
  };
  const addNewConnectTheRelevent = () => {
    let oldData = currentUser.managementConnect;
    if (Array.isArray(oldData)) {
      oldData.push({
        name: "",
        number: "",
        label: "",
      });
      setcurrentUser({ ...currentUser, managementConnect: oldData });
    }
  };
  const deleteConnectTheRelevent = (index) => {
    let oldData = currentUser.managementConnect;
    if (Array.isArray(oldData)) {
      oldData = oldData.filter((e, i) => {
        return i !== index;
      });
      setcurrentUser({ ...currentUser, managementConnect: oldData });
    }
  };
  const handleInputSocialLink = (event, index) => {
    const { value, name } = event.target;

    let oldData = currentUser.socialLink;
    if (Array.isArray(oldData)) {
      oldData[index][name] = value;
      setcurrentUser({ ...currentUser, socialLink: oldData });
    }
  };
  const addNewSocialLink = () => {
    let oldData = currentUser.socialLink;
    if (Array.isArray(oldData)) {
      oldData.push({
        url: "",
        label: "",
      });
      setcurrentUser({ ...currentUser, socialLink: oldData });
    }
  };
  const deleteSocialLinkt = (index) => {
    let oldData = currentUser.socialLink;
    if (Array.isArray(oldData)) {
      oldData = oldData.filter((e, i) => {
        return i !== index;
      });
      setcurrentUser({ ...currentUser, socialLink: oldData });
    }
  };
  const updateProfileLocal = () => {
    dispatch(updateProfile(currentUser))
      .then((resp) => {
        alert.success("Profile updated successfully");
      })
      .catch((err) => {
        alert.error(err.message);
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col
            md="8"
            style={{
              color: "black",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              height: "  calc(100vh - 90px)",
            }}
            // style={{ }}
          >
            <div className="tabs-items d-flex align-content-center justify-content-between">
              {tabsData.map((e) => {
                return (
                  <button
                    key={e}
                    className={
                      activeTab === e ? "single-tab-active" : "single-tab"
                    }
                    onClick={() => {
                      handleActive(e);
                    }}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
            {activeTab === tabsData[0] ? (
              <Row className="content-tab-1">
                <Col md="6">
                  {/* https://console.connecttherelevant.com/assets/media/images/carousal_empty.png */}
                  <input
                    type="file"
                    id="pic"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <input
                    type="file"
                    id="carousal1"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <input
                    type="file"
                    id="carousal2"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <input
                    type="file"
                    id="carousal3"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <input
                    type="file"
                    id="carousal4"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <input
                    type="file"
                    id="carousal5"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <label htmlFor=" ">Gallery</label>
                  <div className="d-flex " style={{ marginBottom: "7px" }}>
                    <div
                      className="Profile-Image"
                      style={{ marginRight: " 7px" }}
                    >
                      <img
                        src={
                          currentUser.pic
                            ? `${Config.S3_PREFIX}${currentUser.pic}`
                            : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                        }
                        height="208px"
                        width="208px"
                        alt="Main"
                        onClick={() => {
                          document.getElementById("pic").click();
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div
                        className=""
                        style={{
                          marginBottom: "8px",
                        }}
                      >
                        <img
                          src={
                            currentUser.carousal1
                              ? `${Config.S3_PREFIX}${currentUser.carousal1}`
                              : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                          }
                          height="100px"
                          width="100px"
                          alt="Main"
                        />
                      </div>
                      <div
                        className=""
                        style={{
                          marginBottom: "8px",
                        }}
                      >
                        <img
                          src={
                            currentUser.carousal2
                              ? `${Config.S3_PREFIX}${currentUser.carousal2}`
                              : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                          }
                          height="100px"
                          width="100px"
                          alt="Main"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between bottom-div-image"
                    style={{ width: "315px" }}
                  >
                    <div className="">
                      <img
                        src={
                          currentUser.carousal3
                            ? `${Config.S3_PREFIX}${currentUser.carousal3}`
                            : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                        }
                        height="100px"
                        width="100px"
                        alt="Main"
                      />
                    </div>
                    <div className="">
                      <img
                        src={
                          currentUser.carousal4
                            ? `${Config.S3_PREFIX}${currentUser.carousal4}`
                            : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                        }
                        height="100px"
                        width="100px"
                        alt="Main"
                      />
                    </div>
                    <div className="">
                      <img
                        src={
                          currentUser.carousal5
                            ? `${Config.S3_PREFIX}${currentUser.carousal5}`
                            : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                        }
                        height="100px"
                        width="100px"
                        alt="Main"
                      />
                    </div>
                  </div>
                  <div className="Preview d-flex justify-content-between mt-4">
                    <label htmlFor="">Preview</label>
                  </div>
                </Col>
                <Col md="6">
                  <div
                    className="single-connect-the-relevent d-flex flex-column"
                    style={{ width: "350px", marginTop: "50px" }}
                  >
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      maxLength={20}
                      disabled
                      value={currentUser.name}
                    />
                    <label htmlFor="number">Number</label>
                    <input
                      type="text"
                      id="number"
                      maxLength={10}
                      disabled
                      value={currentUser.contact_no}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      disabled
                      value={currentUser.email}
                    />
                    <label htmlFor="Profession">Profession</label>
                    <input
                      type="text"
                      id="Profession"
                      value={
                        currentUser.professions_info
                          ? currentUser.professions_info
                              .map((e) => e.title)
                              .toString()
                          : ""
                      }
                      onClick={() => {
                        //todo Open Modal
                      }}
                    />
                    {/* professions_info */}
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {activeTab === tabsData[1] ? (
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
                      />
                      <label htmlFor="number">Number</label>
                      <input
                        type="text"
                        id="number"
                        name="number"
                        maxLength={10}
                        value={e.number}
                        onChange={(e) => {
                          handleInputChangeConnectTheRelevent(e, index);
                        }}
                      />
                      <button>
                        <img src={deleteImage} alt="" />
                        <span
                          onClick={() => {
                            deleteConnectTheRelevent(index);
                          }}
                        >
                          Delete
                        </span>
                      </button>
                    </div>
                  );
                })}
                <div className="add-new-div d-flex justify-content-center align-content-center w-100">
                  <button onClick={addNewConnectTheRelevent}>Add New</button>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeTab === tabsData[2] ? (
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
                    setcurrentUser({ ...currentUser, about: e.target.value });
                  }}
                ></textarea>
              </div>
            ) : (
              ""
            )}
            {activeTab === tabsData[3] ? (
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
                        onChange={(e) => {
                          handleInputSocialLink(e, index);
                        }}
                      />

                      <button
                        onClick={() => {
                          deleteSocialLinkt(index);
                        }}
                      >
                        <img src={deleteImage} alt="" />
                        <span>Delete</span>
                      </button>
                    </div>
                  );
                })}
                <div className="add-new-div d-flex justify-content-center align-content-center w-100">
                  <button onClick={addNewSocialLink} className="addnewbutton">
                    Add New
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeTab === tabsData[4] ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "40px 24px",
                }}
              >
                <label htmlFor="presskit">
                  Email ID to receive Press Kit Requests
                </label>
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
            ) : (
              ""
            )}
            <div className="update-div">
              <button onClick={updateProfileLocal}>Update</button>
            </div>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
