import navbarModeActionTypes from './navbarMode.actionTypes';

const INITIAL_STATE = {
  navbarMode: 'default',
};

const navbarModeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case navbarModeActionTypes.SET_NAVBAR_MODE:
      return {
        ...state,
        navbarMode: payload,
      };

    default:
      return state;
  }
};
export default navbarModeReducer;
