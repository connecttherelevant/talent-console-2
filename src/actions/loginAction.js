import axios from "axios";

import Config from "../Config.js";
import { GET_OTP, VERIFY_OTP } from "../Constant";

export const getOtp = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    try {
      dispatch({
        type: GET_OTP + "REQUEST",
      });
      await axios.post(`${Config.BASE_URL}${Config.GET_OTP}`, body);
      dispatch({
        type: GET_OTP + "SUCCESS",
        payload: body,
      });
      resolve(body);
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: GET_OTP + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};

export const verifyOtp = (body) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: VERIFY_OTP + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.VERIFY_OTP}`,
        body
      );
      dispatch({
        type: VERIFY_OTP + "SUCCESS",
        payload: data.data.user,
      });
      data.data.user.contact_no = hideEverySecondChar(
        data.data.user.contact_no
      );
      data.data.user.email = hideEverySecondChar(data.data.user.email);

      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.accessToken);
      resolve(data.data);
    } catch (error) {
      console.error(error);
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: VERIFY_OTP + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};
export const logOut = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      resolve("logOut");
    } catch (error) {
      reject(error);
    }
  });
};
function hideEverySecondChar(str) {
  return str;
}
