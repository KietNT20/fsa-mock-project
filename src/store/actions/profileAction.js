// actions.js
export const SAVE_PROFILE = "SAVE_PROFILE";

// Tạo action creator
export const saveProfile = (payload) => {
  return {
    type: SAVE_PROFILE,
    payload, // payload sẽ là object bạn muốn lưu vào store
  };
};
