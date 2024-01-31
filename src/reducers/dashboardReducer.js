import { GET_PROFILE_VIEWS } from "../Constant";
const intiialState = {
  profileData: {},
  loading: false,
  error: null,
};
const dashboardReducer = (state = intiialState, action) => {
  switch (action.type) {
    case GET_PROFILE_VIEWS + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_VIEWS + "SUCCESS":
      return {
        ...state,
        loading: false,
        profileData: action.payload,
      };
    case GET_PROFILE_VIEWS + "FAILED":
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
