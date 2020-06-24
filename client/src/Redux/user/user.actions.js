import userActionTypes from './user.actionTypes';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import setAuthToken from './user.utils';
import { setNavbarMode } from '../navbarMode/navbarMode.actions';

//* LOAD USER --------------------------------------------

export const unsubscribe = () => {
  delete axios.defaults.headers.common['x-auth-token'];
  return { type: userActionTypes.UNSUBSCRIBE };
};

const adminMode = () => ({
  type: userActionTypes.ADMIN_MODE,
});

const authSuccess = (userData) => ({
  type: userActionTypes.USER_LOADED,
  payload: userData,
});
const authFailure = (errMsg) => ({
  type: userActionTypes.AUTH_ERROR,
  payload: errMsg,
});

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      'https://pacific-retreat-49876.herokuapp.com/api/auth'
    );

    if (res.data.admin) {
      dispatch(adminMode());
      dispatch(setNavbarMode('admin'));
    } else {
      dispatch(authSuccess(res.data));
    }
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

//* REGISTER --------------------------------------------

const registerSuccess = (token) => ({
  type: userActionTypes.REGISTER_SUCCESS,
  payload: token,
});

const registerFailure = () => ({
  type: userActionTypes.REGISTER_FAILURE,
});

export const registerUser = (userData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(userData);
    try {
      const response = await axios.post(
        'https://pacific-retreat-49876.herokuapp.com/api/users',
        body,
        config
      );
      dispatch(registerSuccess(response.data));
      dispatch(loadUser());
    } catch (error) {
      const errorsArray = error.response.data.errors;

      if (errorsArray) {
        errorsArray.forEach((err) =>
          dispatch(setAlert(err.msg, 'danger', 5000))
        );
      }
      dispatch(registerFailure());
    }
  };
};

//* SIGN IN --------------------------------------------

const signInSuccess = (token) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: token,
});

const signInFailure = () => ({
  type: userActionTypes.SIGN_IN_FAILURE,
});

export const signInUser = (userData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(userData);
    try {
      const response = await axios.post(
        'https://pacific-retreat-49876.herokuapp.com/api/auth',
        body,
        config
      );
      dispatch(signInSuccess(response.data));
      dispatch(loadUser());
    } catch (error) {
      const errorsArray = error.response.data.errors;

      if (errorsArray) {
        errorsArray.forEach((err) =>
          dispatch(setAlert(err.msg, 'danger', 5000))
        );
      }
      dispatch(signInFailure());
    }
  };
};

//* SIGN OUT -----------------------------------------
export const signOut = () => ({
  type: userActionTypes.SIGN_OUT,
});
