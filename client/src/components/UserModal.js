import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleShowUserModal, setToast } from "../redux/uiSlice";
import { setUsers, setUser } from "../redux/userSlice";

import "./UserModal.css";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

function UserModal() {
  const { user, users } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(user || { firstName: "", lastName: "", age: "" });
  const [validation, setValidation] = useState({ firstName: true, lastName: true, age: true });

  const inputs = [
    { label: "First Name", type: "text" },
    { label: "Last Name", type: "text" },
    { label: "Age", type: "number" },
  ];

  const handleClose = () => {
    dispatch(toggleShowUserModal());
    dispatch(setUser(null));
  };

  const handleOnChange = (key, value) => {
    setValidation(prev => {
      return {
        ...prev,
        [key]: value === "" ? false : true,
      };
    });

    setFormData(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSave = async () => {
    let isSame = true;
    let canContinue = true;

    Object.keys(validation).forEach(key => {
      if (user !== null && formData[key].toString() !== user[key].toString()) isSame = false;

      if (formData[key].toString().trim() === "") {
        canContinue = false;

        setValidation(prev => {
          return {
            ...prev,
            [key]: false,
          };
        });
      }
    });

    if (user !== null && isSame) return;
    if (!canContinue) return;

    const userToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
    };

    try {
      setLoading(true);

      if (user === null) {
        const response = await axios.post("/api/users", userToSend);
        dispatch(setUsers([...users, response.data]));
      } else {
        const response = await axios.put(`/api/users/${user._id}`, userToSend);
        const updatedUsers = users.map(x => {
          if (x._id === user._id) {
            return response.data;
          } else {
            return x;
          }
        });
        dispatch(setUsers(updatedUsers));
      }

      dispatch(
        setToast({
          isError: false,
          message: `Super nice! User ${user === null ? "added" : "edited"} successfully!`,
        })
      );

      handleClose();
    } catch (err) {
      console.log(err);
      dispatch(
        setToast({
          isError: true,
          message: `Couldn't ${user === null ? "save" : "edit"}. Try again later.`,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <div className="modal-header">
        <h1>{user === null ? "Add new user" : "Edit user"}</h1>
      </div>

      <div className="modal-body">
        {Object.keys(validation).map((entry, i) => (
          <CustomInput
            key={entry}
            label={inputs[i].label}
            name={entry}
            value={formData[entry]}
            onChange={e => handleOnChange(entry, e.target.value)}
            handleClear={() => handleOnChange(entry, "")}
            type={inputs[i].type}
            valid={validation[entry]}
            errorMessage={"This field must be filled in"}
          />
        ))}
      </div>

      <div className="modal-footer">
        <CustomButton
          text="Save"
          buttonClass={`${user === null ? "primary" : "info"}`}
          loading={loading}
          onClick={handleSave}
        />
        <CustomButton text="Cancel" onClick={handleClose} />
      </div>
    </Modal>
  );
}

export default UserModal;
