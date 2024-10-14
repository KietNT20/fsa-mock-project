import {
  CLEAR_SELECTED_PROJECT_ROW,
  SET_SELECTED_PROJECT_ROW,
} from "../actions/projectRowAction";
const initialState = {
  infoProjectRow: null,
};
const projectRowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PROJECT_ROW:
      return {
        ...state,
        infoProjectRow: action.payload,
      };
    case CLEAR_SELECTED_PROJECT_ROW:
      return {
        ...state,
        infoProjectRow: null,
      };
    default:
      return state;
  }
};

export default projectRowReducer;
