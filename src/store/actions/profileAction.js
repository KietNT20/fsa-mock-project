// actions.js
export const SAVE_PROFILE = "SAVE_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// Tạo action creator
export const saveProfile = (payload) => {
  return {
    type: SAVE_PROFILE,
    payload, // payload sẽ là object bạn muốn lưu vào store
  };
};

export const updateProfile = (userData) => {
  return {
    type: UPDATE_PROFILE,
    payload: userData,
  };
};
