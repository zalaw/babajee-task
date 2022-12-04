import React from "react";
import { FaTimes } from "react-icons/fa";
import "./CustomInput.css";

function CustomInput(props) {
  const {
    containerClass = "",
    label = null,
    name = "",
    icon = null,
    value = "",
    handleClear = () => {},
    valid = true,
    errorMessage = "",
    ...inputProps
  } = props;

  return (
    <div className={`${containerClass} input-main-container`}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="input-container">
        {icon && <div className="button-styled button-round input-icon left no-events">{icon}</div>}

        <input
          id={name}
          name={name}
          className={`${!valid ? "not-valid" : ""} ${icon ? "with-icon" : ""}`}
          value={value}
          {...inputProps}
        />

        {value.length > 0 && (
          <div className="button-styled button-round input-icon right" onClick={handleClear}>
            <FaTimes />
          </div>
        )}
      </div>

      {!valid && <span className="input-error-message">{errorMessage}</span>}
    </div>
  );
}

export default CustomInput;
