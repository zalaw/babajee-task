import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { setToast } from "../redux/uiSlice";

export default function useUserSearch(query = "", page = 1) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLocalUsers([]);
  }, [query]);

  useEffect(() => {
    dispatch(setUsers(localUsers));
  }, [localUsers, dispatch]);

  useEffect(() => {
    setLoading(true);
    setError(true);

    axios({
      method: "GET",
      url: "/api/users",
      params: { query, page },
    })
      .then(res => {
        setLocalUsers(prev => [...prev, ...res.data]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch(e => setError(true));
  }, [query, page]);

  return { loading, hasMore };
}
