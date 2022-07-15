import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideCart: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle(state) {
      state.hideCart = true;
    },
  },
});

export default toggleActions = toggleSlice.actions;

export default toggleSlice;
