import { GET_CATEGORY } from "../Constant";
const intiialState = {
  category: null,
  loading: false,
  error: null,
};
const dashboardReducer = (state = intiialState, action) => {
  switch (action.type) {
    case GET_CATEGORY + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY + "SUCCESS":
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case GET_CATEGORY + "FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
