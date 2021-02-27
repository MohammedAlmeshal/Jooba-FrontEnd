import {  ASK_QUESTION, DELETE_POST, ANSWER_QUESTION, GET_PROFILE,PROFILE_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import axios from "axios";

export const getProfile = (username) => (dispatch, getState) => {
   dispatch(setItemsLoading());
  const { auth } = getState();
  const endpoint = {};

  if (auth.isAuthenticated && auth.user.username === username) {
    endpoint.path = "/api/profiles";
    endpoint.config = tokenConfig(getState);
  } else endpoint.path = `/api/profiles/${username}`;
  axios
    .get(endpoint.path, endpoint.config)
    .then((res) => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(
      (err) => dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const answerToQuestion = (answer, id) => (dispatch, getState) => {
  //  dispatch(setItemsLoading());
  axios
    .post(`/api/posts/answer/${id}`, { answer }, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: ANSWER_QUESTION, payload: { post: res.data, id } });
    })
    .catch(
      (err) => dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const ignoreQuestion = (id) => (dispatch, getState) => {
  //  dispatch(setItemsLoading());
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: id });
    })
    .catch(
      (err) => dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const askQuestion = (question, username) => (dispatch) => {
  //  dispatch(setItemsLoading());
  axios
    .post(`/api/posts/${username}`, { question })
    .then((res) => {
      dispatch({ type: ASK_QUESTION, payload: res.data });
    })
    .catch(
      (err) => dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
