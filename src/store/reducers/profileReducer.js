// reducer.js

import { SAVE_PROFILE } from "../actions/profileAction";

// State khởi tạo
const initialState = {
  profile: {}, // nơi để lưu object
};

// Tạo reducer
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
