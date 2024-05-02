module.exports = Object.freeze({
  BASE_URL: process.env.REACT_APP_API_ENDPOINT,
  S3_PREFIX:
    "https://connecttherelevantstaging.s3.ap-south-1.amazonaws.com/userpic/",
  S3_PREFIX_SOCIAL:
    "https://connecttherelevantstaging.s3.ap-south-1.amazonaws.com/sociallink/",
  GET_OTP: "talent/webLoginSentOTp",
  VERIFY_OTP: "talent/webLoginVerifyOTp",
  GET_CATEGORY: "category/list",
  GET_PROFILE_VIWES: "dashboard/graphprofileview",
  GET_FAV_COUNT: "dashboard/graphbyfavourate",
  GET_USER_DATA: "user/userProfile/",
  PROFILE_UPDATE: "profilerequest",
  GET_USER_NOTIFICATION: "usernotification",
  SEND_PROFILE_SENT_OTP: "artiste/profileVerifyOtpSent",
  SEND_PROFILE_VERIFY_OTP: "artiste/profileVerifyOtpVerify",
  ADD_MANAGER: "artiste/addManager",
  UPDATE_MANAGER: "artiste/updateManager",
  DELETE_MANAGER: "artiste/deleteManager",
  DELETE_SOCIAL_LINK: "artiste/deleteSocialLink",
  UPDATE_SOCIAL_LINK: "artiste/updateSocialLink",
  ADD_SOCIAL_LINK: "artiste/addSocialLink",
});
