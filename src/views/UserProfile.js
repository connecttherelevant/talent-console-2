import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";

import "react-image-crop/dist/ReactCrop.css";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import deleteImage from "../assets/img/delete-svgrepo-com 1.svg";
import facebookIcon from "../assets/img/socialLink/artiste_fb.svg";
import instagramIcon from "../assets/img/socialLink/artiste_insta.svg";
import snapchatIcon from "../assets/img/socialLink/artiste_snapchat.svg";
import xIcon from "../assets/img/socialLink/artiste_x.svg";
import youtubeIcon from "../assets/img/socialLink/artiste_yt.svg";
import wikipediaIcon from "../assets/img/socialLink/artiste_wikipedia.svg";
import website from "../assets/img/socialLink/artiste_web.svg";
import { getUser, updateProfile } from "actions/userAction";
import Config from "../Config";
import ImageCropper from "components/imageCropper/ImageCropper";
import { getCategory } from "actions/categoryAction";

function UserProfile() {
  let dateTime = new Date();

  let tabsData = [
    "Account Information",
    "Connect The Relevant",
    "Official Bio",
    "Verified Social Connect",
    "Request Official Press Kit",
  ];
  const [imageIndex, setImageIndex] = useState(null);
  const [picture, setPicture] = useState("");
  const [carousal1Picture, setCarousal1Picture] = useState("");
  const [carousal2Picture, setCarousal2Picture] = useState("");
  const [carousal3Picture, setCarousal3Picture] = useState("");
  const [carousal4Picture, setCarousal4Picture] = useState("");
  const [carousal5Picture, setCarousal5Picture] = useState("");
  const [activeTab, setactiveTab] = useState(tabsData[0]);
  const [modal, setModal] = useState(false);
  const [proffessionModal, setProffessionModal] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let { user, error, loading } = useSelector((state) => state.loginData);
  let { category } = useSelector((state) => state.categoryData);
  const [currentUser, setcurrentUser] = useState(user ? user : null);
  const [allCategory, setallCategory] = useState(null);
  useEffect(() => {
    if (currentUser && currentUser._id)
      dispatch(getUser({ _id: currentUser._id }))
        .then((resp) => {
          dispatch(getCategory())
            .then((data) => {
              formateCategoryWithParent(data).then((resp) => {
                setallCategory(resp);
              });
            })
            .catch((err) => {
              alert.error(err.message);
            });
        })
        .catch((err) => {
          alert.error(err.message);
        });
  }, []);

  useEffect(() => {
    setcurrentUser(user);
  }, [user]);

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
  const updateProfileLocal = (e) => {
    e.preventDefault();
    let data = { ...currentUser };
    if (picture) data.picture = picture;
    if (carousal1Picture) data.carousal1Picture = carousal1Picture;
    if (carousal2Picture) data.carousal2Picture = carousal2Picture;
    if (carousal3Picture) data.carousal3Picture = carousal3Picture;
    if (carousal4Picture) data.carousal4Picture = carousal4Picture;
    if (carousal5Picture) data.carousal5Picture = carousal5Picture;
    // input validation

    for (let index = 0; index < currentUser.managementConnect.length; index++) {
      const element = currentUser.managementConnect[index];
      if (!element.label) {
        setactiveTab(tabsData[1]);
        checkInViewAndScroll(1);
        alert.error("Label is required");
        return;
      }
      if (!element.name) {
        setactiveTab(tabsData[1]);
        checkInViewAndScroll(1);
        alert.error("name is required");

        return;
      }
      if (!element.number) {
        setactiveTab(tabsData[1]);
        checkInViewAndScroll(1);
        alert.error("number is required");
        return;
      }
    }
    for (let index = 0; index < currentUser.socialLink.length; index++) {
      const element = currentUser.socialLink[index];
      if (!element.label) {
        setactiveTab(tabsData[3]);
        checkInViewAndScroll(3);
        alert.error("Label is required");

        return;
      }
      if (!element.url) {
        setactiveTab(tabsData[3]);
        checkInViewAndScroll(3);
        alert.error("Link is required");
        return;
      }
    }
    dispatch(updateProfile(data))
      .then((resp) => {
        alert.success("Profile updated successfully");
      })
      .catch((err) => {
        alert.error(err.message);
      });
  };
  const updateAvatar = (imgSrc, id) => {
    if (id === 0) {
      setPicture(imgSrc);
    }
    if (id === 1) {
      setCarousal1Picture(imgSrc);
    }
    if (id === 2) {
      setCarousal2Picture(imgSrc);
    }
    if (id === 3) {
      setCarousal3Picture(imgSrc);
    }
    if (id === 4) {
      setCarousal4Picture(imgSrc);
    }
    if (id === 5) {
      setCarousal5Picture(imgSrc);
    }
    setImageIndex(null);
  };
  const proffessionModalToggle = () => setProffessionModal(!proffessionModal);
  const toggle = () => {
    if (modal) {
      setImageIndex(null);
    }
    setModal(!modal);
  };
  const formateCategoryWithParent = (array, data) => {
    return new Promise((resolve, reject) => {
      array = JSON.parse(JSON.stringify(array));
      try {
        let newarray = [];
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.title === "Other") continue;
          if (
            currentUser.professions &&
            currentUser.professions.includes(element._id)
          ) {
            element.selected = true;
          } else {
            element.selected = false;
          }
          if (element.parent === null || element.parent === "") {
            newarray.push(element);
          } else if (
            element.parent !== "" &&
            (data
              ? element.title.toLowerCase().includes(data.toLowerCase())
              : true)
          ) {
            const tempIndex = newarray.findIndex(
              (item) => item._id === element.parent
            );
            let tempObj = newarray[tempIndex];
            if (tempObj) {
              if (tempObj.subcategory) {
                tempObj.subcategory.push(element);
              } else {
                tempObj.subcategory = [element];
              }
              newarray[tempIndex] = tempObj;
            }
          }
        }
        newarray.sort((a, b) => {
          if (a.title === "Main") {
            return -1; // 'Main' should come first
          } else if (b.title === "Main") {
            return 1; // 'Main' should come before other elements
          } else if (a.title > b.title) {
            return 1; // Indicates a should come after b
          } else if (a.title < b.title) {
            return -1; // Indicates a should come before b
          } else {
            return 0; // Indicates they are equal in terms of sorting
          }
        });

        resolve(newarray);
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleCategoryClick = (id, selected, childIndex, parentIndex) => {
    let copy = JSON.parse(JSON.stringify(allCategory));
    copy[parentIndex].subcategory[childIndex].selected = !selected;
    currentUser.professions = currentUser.professions || [];
    currentUser.professions_info = currentUser.professions_info || [];
    if (selected) {
      currentUser.professions = currentUser.professions.filter((e) => e !== id);
      currentUser.professions_info = currentUser.professions_info.filter(
        (e) => e._id !== id
      );
    } else {
      currentUser.professions.push(id);
      currentUser.professions_info.push(
        copy[parentIndex].subcategory[childIndex]
      );
    }

    setallCategory(copy);
  };

  const professionsStyleNonSelected = {
    backgroundColor: "transparent",
    border: "1px solid #e2e5ec",
    color: "#6c7293",
  };
  const professionsStyleSelected = {
    backgroundColor: "#2E7DE0",
    borderColor: "#2E7DE0",
    color: "#fff",
  };
  const getIcon = (label) => {
    if (label === "Facebook") return facebookIcon;
    else if (label === "Twitter") return xIcon;
    else if (label === "Instagram") return instagramIcon;
    else if (label === "Youtube") return youtubeIcon;
    else if (label === "Snapchat") return snapchatIcon;
    else if (label === "Wikipedia") return wikipediaIcon;
    else {
      return website;
    }
  };
  const targetRefDiv1 = useRef(null);
  const targetRefDiv2 = useRef(null);
  const targetRefDiv3 = useRef(null);
  const targetRefDiv4 = useRef(null);
  const targetRefDiv5 = useRef(null);

  const checkInViewAndScroll = (id) => {
    console.log(id);
    if (id === 0) {
      if (targetRefDiv1.current) {
        const position = targetRefDiv1.current.getBoundingClientRect();

        const inView =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (!inView) {
          // Not in view so scroll to it
          targetRefDiv1.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("Element is in view");
        }
      }
    }
    if (id === 1) {
      if (targetRefDiv2.current) {
        const position = targetRefDiv2.current.getBoundingClientRect();

        const inView =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (!inView) {
          // Not in view so scroll to it
          targetRefDiv2.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("Element is in view");
        }
      }
    }
    if (id === 2) {
      if (targetRefDiv3.current) {
        const position = targetRefDiv3.current.getBoundingClientRect();

        const inView =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (!inView) {
          // Not in view so scroll to it
          targetRefDiv3.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("Element is in view");
        }
      }
    }
    if (id === 3) {
      if (targetRefDiv4.current) {
        const position = targetRefDiv4.current.getBoundingClientRect();

        const inView =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (!inView) {
          // Not in view so scroll to it
          targetRefDiv4.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("Element is in view");
        }
      }
    }
    if (id === 4) {
      if (targetRefDiv5.current) {
        const position = targetRefDiv5.current.getBoundingClientRect();

        const inView =
          position.top >= 0 && position.bottom <= window.innerHeight;

        if (!inView) {
          // Not in view so scroll to it
          targetRefDiv5.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("Element is in view");
        }
      }
    }
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
              height: "calc(100vh-80px)",
              // overflowY: "scroll",
            }}
            // style={{ }}
          >
            <div className="tabs-items d-flex align-content-center justify-content-between">
              {tabsData.map((e, index) => {
                return (
                  <button
                    key={e}
                    className={
                      activeTab === e ? "single-tab-active" : "single-tab"
                    }
                    onClick={() => {
                      handleActive(e);
                      checkInViewAndScroll(index);
                    }}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
            <form
              id="mainForm"
              style={{
                height: "90%",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onSubmit={updateProfileLocal}
            >
              <div
                className="content-body"
                style={{
                  // overflow-y: scroll;
                  // height: 700px;
                  overflowY: "scroll",
                  height: "610px",
                }}
              >
                {activeTab === tabsData[0] ? (
                  <Row className="content-tab-1" style={{ width: "100%" }}>
                    <Col md="6">
                      <label htmlFor=" ">Gallery</label>
                      <div className="d-flex " style={{ marginBottom: "7px" }}>
                        <div
                          className="Profile-Image"
                          style={{ marginRight: " 7px" }}
                        >
                          <img
                            src={
                              picture
                                ? picture
                                : currentUser.pic
                                ? `${Config.S3_PREFIX}${currentUser.pic}`
                                : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                            }
                            height="208px"
                            width="208px"
                            alt="Main"
                            onClick={() => {
                              toggle();
                              setImageIndex(0);
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
                                carousal1Picture
                                  ? carousal1Picture
                                  : currentUser.carousal1
                                  ? `${Config.S3_PREFIX}${currentUser.carousal1}`
                                  : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                              }
                              height="100px"
                              width="100px"
                              alt="Main"
                              onClick={() => {
                                toggle();
                                setImageIndex(1);
                              }}
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
                                carousal2Picture
                                  ? carousal2Picture
                                  : currentUser.carousal2
                                  ? `${Config.S3_PREFIX}${currentUser.carousal2}`
                                  : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                              }
                              height="100px"
                              width="100px"
                              alt="Main"
                              onClick={() => {
                                toggle();
                                setImageIndex(2);
                              }}
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
                              carousal3Picture
                                ? carousal3Picture
                                : currentUser.carousal3
                                ? `${Config.S3_PREFIX}${currentUser.carousal3}`
                                : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                            }
                            height="100px"
                            width="100px"
                            alt="Main"
                            onClick={() => {
                              toggle();
                              setImageIndex(3);
                            }}
                          />
                        </div>
                        <div className="">
                          <img
                            src={
                              carousal4Picture
                                ? carousal4Picture
                                : currentUser.carousal4
                                ? `${Config.S3_PREFIX}${currentUser.carousal4}`
                                : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                            }
                            height="100px"
                            width="100px"
                            alt="Main"
                            onClick={() => {
                              toggle();
                              setImageIndex(4);
                            }}
                          />
                        </div>
                        <div className="">
                          <img
                            src={
                              carousal5Picture
                                ? carousal5Picture
                                : currentUser.carousal5
                                ? `${Config.S3_PREFIX}${currentUser.carousal5}`
                                : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                            }
                            height="100px"
                            width="100px"
                            alt="Main"
                            onClick={() => {
                              toggle();
                              setImageIndex(5);
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="Preview d-flex justify-content-between mt-4">
                    <label htmlFor="">Preview</label>
                  </div> */}
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
                            proffessionModalToggle();
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
                        <button
                          type="button"
                          onClick={addNewConnectTheRelevent}
                        >
                          Add New
                        </button>
                      </div>
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
                        setcurrentUser({
                          ...currentUser,
                          about: e.target.value,
                        });
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
              </div>
              {!loading && (
                <div className="update-div">
                  <button type="submit">Update</button>
                </div>
              )}
            </form>
          </Col>
          <Col md="4">
            <div class="mobile-container">
              <div id="div1" style={{ height: "350px" }} ref={targetRefDiv1}>
                <img
                  src={
                    picture
                      ? picture
                      : currentUser.pic
                      ? `${Config.S3_PREFIX}${currentUser.pic}`
                      : "https://console.connecttherelevant.com/assets/media/images/carousal_empty.png"
                  }
                  alt=""
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2>{currentUser.name}</h2>
                <p>
                  {currentUser.professions_info
                    ? currentUser.professions_info
                        .map((e) => e.title)
                        .toString()
                        .slice(0, 25)
                    : ""}{" "}
                  ...
                </p>
                <p>Updated on 3.30pm - 1 June 2023</p>
              </div>
              <div id="div2" className="ManagermentConnect" ref={targetRefDiv2}>
                <h3>Connect The Relevant</h3>
                <ul
                  style={{
                    display: "flex",
                    overflowX: "scroll",
                  }}
                >
                  {currentUser.managementConnect.map((m) => {
                    return (
                      <>
                        {" "}
                        <li
                          style={{
                            listStyle: "none",
                            cursor: "pointer",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "15px",
                            lineHeight: "19px",
                            color: "#1A1C3A",
                            width: "100&",
                          }}
                          className="mx-2"
                        >
                          {m.label}

                          <br />
                          <p>{m.name}</p>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div id="div3" ref={targetRefDiv3}>
                <h3>Official Bio</h3>
                <div>
                  <p> {currentUser.about}</p>
                </div>
              </div>
              <div>
                {" "}
                <div id="div4" ref={targetRefDiv4}>
                  <h3>Verified Social Connect</h3>

                  {currentUser.socialLink.map((e) => {
                    return (
                      <img
                        className="my-1"
                        height={"20px"}
                        src={getIcon(e.label)}
                        width={50}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>

              <div id="div5" ref={targetRefDiv5}>
                {currentUser.pressKitEmailId && (
                  <>
                    <h3>Request Official Press Kit</h3>
                    <div>
                      <span> Request</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Image Update</ModalHeader>
        <ModalBody>
          <ImageCropper
            updateAvatar={updateAvatar}
            closeModal={toggle}
            id={imageIndex}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={proffessionModal}
        toggle={proffessionModalToggle}
        size="xl" // Changed from "modal-xl" to "lg" for large size
        //
      >
        <ModalBody style={{ width: "100%" }}>
          <div
            class="kt-form__section kt-form__section--first"
            style={{
              height: "  calc(60vh)",
              overflowY: "scroll",
              paddingLeft: "20px  ",
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                formateCategoryWithParent(category, e.target.value).then(
                  (data) => {
                    setallCategory(data);
                  }
                );
              }}
              placeholder="Search"
              style={{
                width: "500px",
                border: "0.5px solid #eaeaea",
                borderRadius: "12px",
              }}
            />

            {allCategory &&
              allCategory.map((item, index) => {
                return (
                  <div key={item._id} className="form-group kt-form__group row">
                    <p>{item.title}</p>
                    <div>
                      {item.subcategory &&
                        item.subcategory.map((sub, i) => {
                          return (
                            <button
                              key={sub._id}
                              className="m-1"
                              style={
                                sub.selected
                                  ? professionsStyleSelected
                                  : professionsStyleNonSelected
                              }
                              onClick={() => {
                                handleCategoryClick(
                                  sub._id,
                                  sub.selected,
                                  i,
                                  index
                                );
                              }}
                            >
                              {sub.title}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={proffessionModalToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserProfile;
