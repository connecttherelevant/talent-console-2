import {
  GET_OTP,
  VERIFY_OTP,
  GET_USER,
  UPDATE_PROFILE,
  GET_USER_NOTIFICATION,
} from "../Constant";
const intiialState = {
  contact_no: "",
  loading: false,
  user: null,
  error: null,
  notification: [],
};
let userCheck = localStorage.getItem("user");
if (userCheck) {
  intiialState.user = JSON.parse(userCheck);
}
const loginReducer = (state = intiialState, action) => {
  switch (action.type) {
    case GET_OTP + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case GET_OTP + "SUCCESS":
      return {
        ...state,
        loading: false,
        contact_no: action.payload.contact_no,
      };
    case GET_OTP + "FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case VERIFY_OTP + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case VERIFY_OTP + "SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case VERIFY_OTP + "FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case GET_USER + "SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_USER + "FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE + "SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PROFILE + "FAILED":
      return {
        ...state,
        loading: false,
      };
    case GET_USER_NOTIFICATION + "REQUEST":
      return {
        ...state,
        loading: true,
      };
    case GET_USER_NOTIFICATION + "SUCCESS":
      return {
        ...state,
        loading: false,
        notification: action.payload,
      };
    case GET_USER_NOTIFICATION + "FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default loginReducer;
