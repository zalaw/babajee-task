import React, { useState, useRef, useCallback } from "react";
import { FaTrash, FaPen, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowUserModal, toggleShowDeleteModal } from "../redux/uiSlice";
import { setUser } from "../redux/userSlice";
import CustomInput from "./CustomInput";
import Loader from "./Loader";
import "./Table.css";
import useUserSearch from "../hooks/useUserSearch";

import CustomButton from "./CustomButton";

function Table() {
  const { users } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const { hasMore, loading } = useUserSearch(query, page);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      setPage(1);
    }
  };

  const handleClear = () => {
    setQuery("");
    setInputValue("");
  };

  const handleEditUser = user => {
    dispatch(toggleShowUserModal());
    dispatch(setUser(user));
  };

  const handleDeleteUser = user => {
    dispatch(toggleShowDeleteModal());
    dispatch(setUser(user));
  };

  return (
    <div className="wrapper table-main-container">
      <div className="table-header">
        <h1>List of Users</h1>

        <div className="actions">
          {process.env.NODE_ENV === "development" && (
            <CustomButton buttonClass="danger" text="Delete all users" onClick={() => handleDeleteUser(null)} />
          )}
          <CustomButton buttonClass="primary" text="Add new user" onClick={() => dispatch(toggleShowUserModal())} />
        </div>
      </div>

      <div className="flex align-items-center">
        <CustomInput
          name="search"
          containerClass="full-width"
          value={inputValue}
          icon={<FaSearch />}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search for an user (press Enter)"
          handleClear={handleClear}
          type="text"
        />
      </div>

      <div className="table-area">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => {
              if (users.length === index + 1) {
                return (
                  <tr ref={lastUserElementRef} key={user._id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td className="actions">
                      <div className="button-styled info icon" onClick={() => handleEditUser(user)}>
                        <FaPen />
                      </div>
                      <div className="button-styled danger" onClick={() => handleDeleteUser(user)}>
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={user._id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td className="actions">
                      <div className="button-styled info icon" onClick={() => handleEditUser(user)}>
                        <FaPen />
                      </div>
                      <div className="button-styled danger" onClick={() => handleDeleteUser(user)}>
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        {!loading && query.length > 0 && users.length === 0 && (
          <p className="doomed">🤡 Literally 0 results for your search 🤡</p>
        )}
        {!loading && query.length === 0 && users.length === 0 && <p className="doomed">😢 This table is empty 😢</p>}

        {loading && (
          <div className="table-loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
