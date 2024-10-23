import { SAVE_USER_PROFILE } from "../actions/userProfileAction";

const initialState = {
  userProfile: {},
};

// Tạo reducer
const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };

    default:
      return state;
  }
};

export default userProfileReducer;
