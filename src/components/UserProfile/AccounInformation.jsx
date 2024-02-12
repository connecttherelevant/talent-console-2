import React from "react";
import { Row, Col } from "reactstrap";
import Config from "../../Config";
const AccounInformation = ({
  picture,
  carousal1Picture,
  carousal2Picture,
  carousal3Picture,
  carousal4Picture,
  carousal5Picture,
  currentUser,
  toggle,
  setImageIndex,
  proffessionModalToggle,
}) => {
  return (
    <Row className="content-tab-1" style={{ width: "100%" }}>
      <Col md="6">
        <label htmlFor=" ">Gallery</label>
        <div className="d-flex " style={{ marginBottom: "7px" }}>
          <div className="Profile-Image" style={{ marginRight: " 7px" }}>
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
          <input type="email" id="email" disabled value={currentUser.email} />
          <label htmlFor="Profession">Profession</label>
          <input
            type="text"
            id="Profession"
            value={
              currentUser.professions_info
                ? currentUser.professions_info.map((e) => e.title).toString()
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
  );
};

export default AccounInformation;
