import userActionTypes from './user.actionTypes';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errorMessage: undefined,
  adminMode: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        admin: false,
      };

    case userActionTypes.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errorMessage: payload,
        admin: false,
      };

    case userActionTypes.ADMIN_MODE:
      return {
        ...state,
        admin: true,
        isAuthenticated: true,
        loading: false,
      };

    case userActionTypes.REGISTER_SUCCESS:
    case userActionTypes.SIGN_IN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        admin: false,
      };

    case userActionTypes.REGISTER_FAILURE:
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        admin: false,
      };

    default:
      return state;
  }
};
export default userReducer;
