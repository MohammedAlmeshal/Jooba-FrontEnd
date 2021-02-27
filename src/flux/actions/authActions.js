import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// check token & load user
export const loadUser = () =>  (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

   axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
     dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = ({ name, username, email, password }) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ name, username, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login User
export const login = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth", body, config)
    .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;

    return config;
  }
};

// logout
export const logout = () => {
  return { type: LOGOUT_SUCCESS };
};
