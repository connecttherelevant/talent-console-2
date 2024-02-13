import axios from "axios";

import Config from "../Config.js";
import {
  GET_USER,
  UPDATE_PROFILE,
  GET_USER_NOTIFICATION,
  SEND_PROFILE_VERIFY_OTP,
  SEND_PROFILE_SENT_OTP,
} from "../Constant";

export const getUser = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: GET_USER + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.GET_USER_DATA}${body._id}`,
        {},
        config
      );
      dispatch({
        type: GET_USER + "SUCCESS",
        payload: data.data,
      });
 
      localStorage.setItem("user", JSON.stringify(data.data));
      resolve(body);
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: GET_USER + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};

export const updateProfile = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: UPDATE_PROFILE + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.PROFILE_UPDATE}`,
        body,
        config
      );
      dispatch({
        type: UPDATE_PROFILE + "SUCCESS",
        payload: data.data,
      });
      // localStorage.setItem("user", JSON.stringify(data.data));
      resolve(body);
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: UPDATE_PROFILE + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};

export const getNotification = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: GET_USER_NOTIFICATION + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.GET_USER_NOTIFICATION}`,
        body,
        config
      );
      dispatch({
        type: GET_USER_NOTIFICATION + "SUCCESS",
        payload: data.data,
      });
      resolve(body);
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: GET_USER_NOTIFICATION + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};
export const sendProfileUpdateOtp = () => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: SEND_PROFILE_SENT_OTP + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.SEND_PROFILE_SENT_OTP}`,
        {},
        config
      );
      dispatch({
        type: SEND_PROFILE_SENT_OTP + "SUCCESS",
        payload: data.data,
      });
      resolve();
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: SEND_PROFILE_SENT_OTP + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};
export const sendProfileUpdateOtpVerify = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: SEND_PROFILE_VERIFY_OTP + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.SEND_PROFILE_VERIFY_OTP}`,
        body,
        config
      );
      if (data.status === 1) {
        dispatch({
          type: SEND_PROFILE_VERIFY_OTP + "SUCCESS",
          payload: data.data,
        });
        resolve();
      } else {
        dispatch({
          type: SEND_PROFILE_VERIFY_OTP + "FAILED",
          payload: "Invalid Otp",
        });
        resject(new Error(`Invalid Otp`));
      }
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: SEND_PROFILE_VERIFY_OTP + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};

