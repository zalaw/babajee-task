import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "UI",
  initialState: {
    showUserModal: false,
    showDeleteModal: false,
    toast: {
      isError: null,
      message: null,
    },
  },
  reducers: {
    toggleShowUserModal: state => {
      state.showUserModal = !state.showUserModal;
    },
    toggleShowDeleteModal: state => {
      state.showDeleteModal = !state.showDeleteModal;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { toggleShowUserModal, toggleShowDeleteModal, setToast } = uiSlice.actions;

export default uiSlice.reducer;
