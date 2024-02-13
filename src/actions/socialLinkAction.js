import axios from "axios";

import Config from "../Config.js";
import {
  ADD_SOCIAL_LINK,
  UPDATE_SOCIAL_LINK,
  DELETE_SOCIAL_LINK,
} from "../Constant";

export const addSocialLinkTTTT = (body) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: ADD_SOCIAL_LINK + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.ADD_SOCIAL_LINK}`,
        body,
        config
      );

      dispatch({
        type: ADD_SOCIAL_LINK + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: ADD_SOCIAL_LINK + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};
export const updateSocialLink = (body) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: UPDATE_SOCIAL_LINK + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.UPDATE_SOCIAL_LINK}`,
        body,
        config
      );

      dispatch({
        type: UPDATE_SOCIAL_LINK + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: UPDATE_SOCIAL_LINK + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};

export const deleteSocialLink = (body) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userToken = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: DELETE_SOCIAL_LINK + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.DELETE_SOCIAL_LINK}`,
        body,
        config
      );

      dispatch({
        type: DELETE_SOCIAL_LINK + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: DELETE_SOCIAL_LINK + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};
