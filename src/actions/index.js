import axios from "axios";
import { FETCH_USER, FETCH_POST, FETCH_POSTS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitPost = (values, file, history) => async dispatch => {
  const uploadConfig = await axios.get("/api/upload");

  await axios.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type
    }
  });

  const res = await axios.post("/api/posts", {
    ...values,
    imageUrl: uploadConfig.data.key
  });

  history.push("/posts");
  dispatch({ type: FETCH_POST, payload: res.data });
};

export const fetchPosts = () => async dispatch => {
  const res = await axios.get("/api/posts");

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const fetchPost = id => async dispatch => {
  const res = await axios.get(`/api/posts/${id}`);

  dispatch({ type: FETCH_POST, payload: res.data });
};
