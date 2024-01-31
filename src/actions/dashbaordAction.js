import axios from "axios";

import Config from "../Config.js";
import { GET_PROFILE_VIEWS } from "../Constant";

export const getProfileViews = (body) => async (dispatch) => {
  return new Promise(async (resolve, resject) => {
    const userToken = localStorage.getItem("token");
    try {
      let config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: GET_PROFILE_VIEWS + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.GET_PROFILE_VIWES}`,
        body,
        config
      );

      dispatch({
        type: GET_PROFILE_VIEWS + "SUCCESS",
        payload: data.data,
      });
      resolve(data.data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: GET_PROFILE_VIEWS + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};
