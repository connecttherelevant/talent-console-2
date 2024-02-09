/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================



* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// reactstrap components

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
} from "reactstrap";
import { logOut } from "actions/loginAction";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import Config from "../../Config";

import { getNotification } from "actions/userAction";
import { useAlert } from "react-alert";
function AdminNavbar(props) {
  const logo = "https://console.connecttherelevant.com/assets/favicon.png";
  const alert = useAlert();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  let { user, notification } = useSelector((state) => state.loginData);
  const [localNotification, setlocalNotification] = useState(null);
  const [collapseOpen, setcollapseOpen] = React.useState(false);

  const [color, setcolor] = React.useState("navbar-transparent");
  useEffect(() => {
    dispatch(
      getNotification({
        status: 1,
        to: user._id || "",
        isFav: false,
      })
    )
      .then((res) => {})
      .catch((error) => {
        alert.error(error.message);
      });
  }, []);
  useEffect(() => {
    setlocalNotification(notification);
  }, [notification]);
  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  const patchIsviwed = (_id, index) => {
    let copy = JSON.parse(JSON.stringify(localNotification));
    copy[index] = { ...copy[index], isViewed: true };
    setlocalNotification(copy);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  {localNotification &&
                    localNotification.find((e) => !e.isViewed) && (
                      <div className="notification d-none d-lg-block d-xl-block" />
                    )}
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-navbar"
                  right
                  tag="ul"
                  style={{
                    height: "300px",
                    overflowY: "scroll",
                  }}
                >
                  {localNotification &&
                    localNotification.length &&
                    localNotification.map((e, index) => {
                      return (
                        <NavLink tag="li">
                          <DropdownItem
                            className="nav-item"
                            onClick={() => {
                              patchIsviwed(e._id, index);
                            }}
                          >
                            <img
                              className="mx-1"
                              src={e.pic ? `${Config.S3_PREFIX}${e.pic}` : logo}
                              height={"20px"}
                              width={"20px"}
                              alt=""
                            />
                            {e.message}{" "}
                            {!e.isViewed && (
                              <span style={{ color: "red" }}> *</span>
                            )}
                          </DropdownItem>
                        </NavLink>
                      );
                    })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={
                        user.pic
                          ? `${Config.S3_PREFIX + user.pic}`
                          : require("assets/img/anime3.png")
                      }
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem
                      onClick={() => {
                        dispatch(logOut())
                          .then((resp) => {
                            navigation("/login");
                          })
                          .catch((err) => {});
                      }}
                      className="nav-item"
                    >
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
