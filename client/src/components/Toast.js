import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../redux/uiSlice";
import "./Toast.css";

function Toast() {
  const { ui } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setToast({ isError: null, message: null }));
  };

  return (
    <div className={`toast-container`}>
      <div className={`toast ${ui.toast.isError ? "toast-danger" : "toast-success"}`} onClick={handleClose}>
        <p>{ui.toast.message}</p>
      </div>
    </div>
  );
}

export default Toast;
