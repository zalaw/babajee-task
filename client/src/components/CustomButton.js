import React from "react";
import Loader from "./Loader";
import "./CustomButton.css";

function CustomButton({ text, buttonClass = "", loading = false, disabled = false, onClick = () => {} }) {
  return (
    <button
      className={`${buttonClass} ${disabled ? "button-disabled" : ""} button-styled`}
      disabled={disabled}
      onClick={() => {
        if (!disabled && !loading) onClick();
      }}
    >
      {loading ? (
        <div className="button-loader">
          <Loader />
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}

export default CustomButton;
