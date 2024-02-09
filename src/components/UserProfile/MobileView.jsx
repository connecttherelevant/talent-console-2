import React from "react";
import { Col } from "reactstrap";
import Config from "../../Config";
const MobileView = ({
  targetRefDiv1,
  targetRefDiv2,
  targetRefDiv3,
  targetRefDiv4,
  targetRefDiv5,
  picture,
  currentUser,
  getIcon,
}) => {
  return (
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
  );
};

export default MobileView;
