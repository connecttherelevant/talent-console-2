import axios from "axios";

import Config from "../Config.js";
import { GET_CATEGORY } from "../Constant";

export const getCategory = () => async (dispatch) => {
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
        type: GET_CATEGORY + "REQUEST",
      });
      let { data } = await axios.post(
        `${Config.BASE_URL}${Config.GET_CATEGORY}`,
        {
          filter: {
            status: 1,
          },
        },
        config
      );

      dispatch({
        type: GET_CATEGORY + "SUCCESS",
        payload: data.data,
      });
      resolve(data.data);
    } catch (error) {
      error.message = error?.response?.data?.message || "Network Issue";
      dispatch({
        type: GET_CATEGORY + "FAILED",
        payload: error.message,
      });

      resject(error);
    }
  });
};
