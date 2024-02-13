import axios from "axios";

import Config from "../Config.js";
import { ADD_MANAGER, UPDATE_MANAGER, DELETE_MANAGER } from "../Constant";

export const addConnect = (body) => async (dispatch) => {
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
        type: ADD_MANAGER + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.ADD_MANAGER}`,
        body,
        config
      );

      console.log("GHellllo", data);
      dispatch({
        type: ADD_MANAGER + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: ADD_MANAGER + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};
export const editConnect = (body) => async (dispatch) => {
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
        type: UPDATE_MANAGER + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.UPDATE_MANAGER}`,
        body,
        config
      );

      dispatch({
        type: UPDATE_MANAGER + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: UPDATE_MANAGER + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};

export const deleteConnect = (body) => async (dispatch) => {
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
        type: DELETE_MANAGER + "REQUEST",
      });
      let data = await axios.post(
        `${Config.BASE_URL}${Config.DELETE_MANAGER}`,
        body,
        config
      );

      dispatch({
        type: DELETE_MANAGER + "SUCCESS",
        payload: data,
      });
      resolve(data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: DELETE_MANAGER + "FAILED",
        payload: error.message,
      });
      reject(error);
    }
  });
};
