/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================



* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProtectedRoute from "./ProtectedRoute";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import store from "./store";
import { Provider } from "react-redux";
import Login from "views/Login";
import { Error404 } from "views/Error404";
import axios from "axios";

// This setup could be inside a React component or hook
const useAxiosSetup = () => {
  const navigate = useNavigate();

  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
};
const App = () => {
  useAxiosSetup(); // Correctly use the Axios setup within a component

  return (
    <AlertProvider
      template={AlertTemplate}
      {...{
        position: positions.TOP_RIGHT,
        timeout: 5000,
        offset: "30px",
        transition: transitions.SCALE,
      }}
    >
      <Provider store={store}>
        <ThemeContextWrapper>
          <BackgroundColorWrapper>
            <Routes>
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/rtl/*" element={<RTLLayout />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BackgroundColorWrapper>
        </ThemeContextWrapper>
      </Provider>
    </AlertProvider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);
