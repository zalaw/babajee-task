import React, { useState } from "react";
import Modal from "./Modal";
import { FaTrash } from "react-icons/fa";
import "./DeleteModal.css";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowDeleteModal, setToast } from "../redux/uiSlice";
import { setUsers, setUser } from "../redux/userSlice";
import axios from "axios";

function DeleteModal() {
  const { user, users } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (user === null) {
        await axios.delete("/api/users");
        dispatch(setUsers([]));
      } else {
        await axios.delete(`/api/users/${user._id}`);
        dispatch(setUsers(users.filter(x => x._id !== user._id)));
      }

      handleClose();

      dispatch(
        setToast({
          isError: false,
          message: `${user === null ? "Users" : "User"} deleted successfully!`,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setToast({
          isError: true,
          message: "Couldn't delete. Try again later.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(toggleShowDeleteModal());
    dispatch(setUser(null));
  };

  return (
    <Modal>
      <div className="modal-header modal-header-icon danger-color">
        <FaTrash />
      </div>

      <div className="modal-body center">
        <h1>Are you sure?</h1>
        {user === null ? (
          <p>
            Do you really want to delete all the records?
            <br />
            This process cannot be undone.
          </p>
        ) : (
          <p>
            Do you really want to delete the record with id{" "}
            <span style={{ color: "rgb(255, 85, 113)" }}>{user.id}</span>?
            <br />
            This process cannot be undone.
          </p>
        )}
      </div>

      <div className="modal-footer">
        <CustomButton text="Delete" buttonClass="danger" loading={loading} onClick={handleDelete} />
        <CustomButton text="Cancel" onClick={handleClose} />
      </div>
    </Modal>
  );
}

export default DeleteModal;
