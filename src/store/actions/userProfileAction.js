export const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";

export const saveUserProfile = (userProfile) => {
  return {
    type: SAVE_USER_PROFILE,
    payload: userProfile,
  };
};
