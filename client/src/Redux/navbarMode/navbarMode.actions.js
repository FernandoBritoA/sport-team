import navbarModeActionTypes from './navbarMode.actionTypes';

export const setNavbarMode = (mode) => ({
  type: navbarModeActionTypes.SET_NAVBAR_MODE,
  payload: mode,
});
