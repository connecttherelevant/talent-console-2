import React, { useState } from "react";

import Config from "../../Config";
import {
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import classnames from "classnames";

import connectIcon from "../../assets/img/connect_icon.svg";
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
  const [currentActiveTab, setCurrentActiveTab] = useState("0");
  const [currentActiveTabSocial, setCurrentActiveTabSocial] = useState("0");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const toggleSocial = (tab) => {
    if (currentActiveTabSocial !== tab) setCurrentActiveTabSocial(tab);
  };
  return (
    <Col md="4">
      <div className="mobile-container">
        <div id="div1" style={{ height: "350px" }} ref={targetRefDiv1}>
          <img
            width={"100%"}
            height={"100%"}
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
        <div className="info_profile">
          <span>{currentUser.name}</span>
          <p>
            {currentUser.professions_info
              ? currentUser.professions_info
                  .map((e) => e.title)
                  .join(", ")
                  .slice(0, 37)
              : " "}

            {currentUser.professions_info?.map((e) => e.title).join(", ")
              .length > 37
              ? "..."
              : ""}
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontWeight: "400",
              marginTop: "10px",
            }}
          >
            Updated on 3.30pm - 1 June 2023
          </p>
        </div>
        <div id="div2" className="ManagermentConnect ctr" ref={targetRefDiv2}>
          <span>
            Connect The Relevant{" "}
            <p
              style={{
                color: "#b8bbc6",
                fontSize: "12px",
                display: "inline-block",
              }}
            >
              for
            </p>
          </span>
<div className="white_card">
          <Nav tabs>
            {currentUser.managementConnect?.map((m, index) => {
              return (
                <NavItem key={m._id}>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === `${index}`,
                    })}
                    onClick={() => {
                      toggle(`${index}`);
                    }}
                  >
                    {m.label}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            {currentUser.managementConnect?.map((m, index) => {
              return (
                <TabPane key={m._id} tabId={`${index}`}>
                  <Row>
                    <Col sm="12">
                      <h5 style={{ color: "#2e7de0", marginLeft: "-12px", fontSize:"14px" }}>{m.name}</h5>
                    </Col>
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
          <div>
            <button>
              <img
                src={connectIcon}
                alt="Connect Icon"
                style={{ verticalAlign: "middle", marginRight: "5px" }}
              />
              Connect
            </button>
            </div>
          </div>
        </div>

        <div>
          {" "}
          <div className="vsc" id="div4" ref={targetRefDiv3}>
            <span>
              Platforms{" "}
              <p
                style={{
                  color: "#b8bbc6",
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                for
              </p>
            </span>
            <div className="white_card">
            <div style={{ marginTop: "20px" }}>
              {/* {currentUser.socialLink?.map((e) => {
                return (
                  <img
                    key={e._id}
                    className="my-1"
                    height={"30px"}
                    src={getIcon(e.label)}
                    width={75}
                    alt=""
                  />
                );
              })} */}

              <Nav tabs>
                {[
                  { label: "Social Media" },
                  { label: "Audio Streaming" },
                  { label: "Other Links" },
                ].map((m, index) => {
                  return (
                    <NavItem key={m._id}>
                      <NavLink
                        className={classnames({
                          active: currentActiveTabSocial === `${index}`,
                        })}
                        onClick={() => {
                          toggleSocial(`${index}`);
                        }}
                      >
                        {m.label}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              <TabContent activeTab={currentActiveTabSocial}>
                <TabPane tabId={`0`}>
                  {currentUser.socialLink
                    ?.filter((e) => e.type === "social")
                    .map((m, index) => {
                      return (
                        <img
                          key={m._id}
                          className="m-1"
                         
                          src={getIcon(m.label)}
                          width={"30px"}
                          alt={m.label}
                        />
                      );
                    })}
                </TabPane>
                <TabPane tabId={`1`}>
                  {currentUser.socialLink
                    ?.filter((e) => e.type === "streaming")
                    .map((m, index) => {
                      return (
                        <img
                          key={m._id}
                          className="m-1"
                          
                          src={getIcon(m.label)}
                          width={"30px"}
                          alt={m.label}
                        />
                      );
                    })}
                </TabPane>
                <TabPane tabId={`2`}>
                  {" "}
                  {currentUser.socialLink
                    ?.filter((e) => e.type === "other")
                    .map((m, index) => {
                      return (
                        <img
                          key={m._id}
                          className="m-1"
                          
                          width={"30px"}
                          src={getIcon(m.label)}
                          alt={m.label}
                        />
                      );
                    })}
                </TabPane>
              </TabContent>
            </div>
            </div>
          </div>
        </div>

        {/* <div className="presskit" id="div5" ref={targetRefDiv5}>
          {currentUser.pressKitEmailId && (
            <>
              <span>Request Official Press Kit</span>
              <div>
                <button> Request</button>
              </div>
            </>
          )}
        </div> */}
      </div>
    </Col>
  );
};

export default MobileView;
