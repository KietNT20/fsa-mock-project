import { CLEAR_INFO_ROW, SET_INFO_ROW } from "../actions/infoRowAction";

const initialState = {
  infoRow: {},
};

const infoRowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO_ROW:
      return {
        ...state,
        infoRow: action.payload,
      };
    case CLEAR_INFO_ROW:
      return {
        ...state,
        infoRow: {},
      };
    default:
      return state;
  }
};

export default infoRowReducer;
