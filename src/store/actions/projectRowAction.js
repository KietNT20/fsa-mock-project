// projectRowAction.js
export const SET_SELECTED_PROJECT_ROW = "SET_SELECTED_PROJECT_ROW";
export const CLEAR_SELECTED_PROJECT_ROW = "CLEAR_SELECTED_PROJECT_ROW";

// Action to set the selected row
export const setSelectedProjectRow = (row) => ({
  type: SET_SELECTED_PROJECT_ROW,
  payload: row,
});

// Action to clear the selected row
export const clearSelectedProjectRow = () => ({
  type: CLEAR_SELECTED_PROJECT_ROW,
});
