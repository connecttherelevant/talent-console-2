import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
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
import ImageCropper from "components/imageCropper/ImageCropper";
import { getCategory } from "actions/categoryAction";
import AccounInformation from "components/UserProfile/AccounInformation";
import ConnectTheRelevant from "components/UserProfile/ConnectTheRelevant";
import OfficalBio from "components/UserProfile/OfficalBio";
import VerifiedSocialConnect from "components/UserProfile/VerifiedSocialConnect";
import MobileView from "components/UserProfile/MobileView";
import PressKit from "components/UserProfile/PressKit";

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
  let { user, loading } = useSelector((state) => state.loginData);
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
              left: "-30px",
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
                  <AccounInformation
                    picture={picture}
                    carousal1Picture={carousal1Picture}
                    carousal2Picture={carousal2Picture}
                    carousal3Picture={carousal3Picture}
                    carousal4Picture={carousal4Picture}
                    carousal5Picture={carousal5Picture}
                    currentUser={currentUser}
                    toggle={toggle}
                    setImageIndex={setImageIndex}
                    proffessionModalToggle={proffessionModalToggle}
                  />
                ) : (
                  ""
                )}
                {activeTab === tabsData[1] ? (
                  <ConnectTheRelevant
                    currentUser={currentUser}
                    handleInputChangeConnectTheRelevent={
                      handleInputChangeConnectTheRelevent
                    }
                    deleteImage={deleteImage}
                    deleteConnectTheRelevent={deleteConnectTheRelevent}
                    addNewConnectTheRelevent={addNewConnectTheRelevent}
                  />
                ) : (
                  ""
                )}
                {activeTab === tabsData[2] ? (
                  <OfficalBio
                    setcurrentUser={setcurrentUser}
                    currentUser={currentUser}
                  />
                ) : (
                  ""
                )}
                {activeTab === tabsData[3] ? (
                  <VerifiedSocialConnect
                    currentUser={currentUser}
                    handleInputSocialLink={handleInputSocialLink}
                    deleteSocialLinkt={deleteSocialLinkt}
                    deleteImage={deleteImage}
                    addNewSocialLink={addNewSocialLink}
                  />
                ) : (
                  ""
                )}
                {activeTab === tabsData[4] ? (
                  <PressKit
                    setcurrentUser={setcurrentUser}
                    currentUser={currentUser}
                  />
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
          <MobileView
            targetRefDiv1={targetRefDiv1}
            targetRefDiv2={targetRefDiv2}
            targetRefDiv3={targetRefDiv3}
            targetRefDiv4={targetRefDiv4}
            targetRefDiv5={targetRefDiv5}
            picture={picture}
            currentUser={currentUser}
            getIcon={getIcon}
          />
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
