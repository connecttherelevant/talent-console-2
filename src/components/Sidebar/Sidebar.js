/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================



* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";

import connectLogo from "../../assets/img/ctr_full_logo.svg";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={connectLogo} alt="Connect Logo" />
          </div>
        </a>
      );
      // logoText = (
      //   <a
      //     href={logo.outterLink}
      //     className="simple-text logo-normal"
      //     target="_blank"
      //     onClick={props.toggleSidebar}
      //   >
      //     {logo.text}
      //   </a>
      // );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={connectLogo} alt="Connect Logo" />
          </div>
        </Link>
      );
      // logoText = (
      //   <Link
      //     to={logo.innerLink}
      //     className="simple-text logo-normal"
      //     onClick={props.toggleSidebar}
      //   >
      //     {logo.text}
      //   </Link>
      // );
    }
  }
  let activeStyle = {
    color: "#2E7DE0 !important",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",

  };
  let inactiveStyle = {
    backgroundColor: "#2E7DE0",
    color: "#FFFFFF ",
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {/* {logoText} */}
              </div>
            ) : null}

            <Nav>
              {routes.map((prop, key) => {
                // console.log(activeRoute(prop.path));
                if (prop.redirect) return null;
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.layout + prop.path}
                      // className="nav-link"

                      onClick={props.toggleSidebar}
                    >
                      <div
                      className="d-flex"
                        style={
                          activeRoute(prop.path) ? activeStyle : inactiveStyle
                        }
                      >
                        <img src={prop.icon} alt="" className="mx-2"/>
                        <p
                        className="mx-2"
                          style={{
                            color: activeRoute(prop.path) ? "#2E7DE0" : "#FFF",
                          }}
                        >
                          {rtlActive ? prop.rtlName : prop.name}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
              {/* <li className="active-pro">
                <ReactstrapNavLink href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro">
                  <i className="tim-icons icon-spaceship" />
                  <p>Upgrade to PRO</p>
                </ReactstrapNavLink>
              </li> */}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
