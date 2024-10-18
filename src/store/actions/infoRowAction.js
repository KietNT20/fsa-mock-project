// src/redux/actions/selectedRowActions.js

export const SET_INFO_ROW = "SET_SELECTED_ROW";
export const CLEAR_INFO_ROW = "CLEAR_SELECTED_ROW";

export const setSelectedRow = (row) => ({
  type: SET_INFO_ROW,
  payload: row,
});

export const clearSelectedRow = () => ({
  type: CLEAR_INFO_ROW,
});
