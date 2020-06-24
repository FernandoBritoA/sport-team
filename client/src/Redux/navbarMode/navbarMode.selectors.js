import { createSelector } from 'reselect';

const selectNavbarState = (state) => state.navbarMode;

const navbarModes = {
  default: false,
  store: false,
  admin: false,
};

export const selectNavbarMode = createSelector(
  [selectNavbarState],
  (navbarState) => {
    switch (navbarState.navbarMode) {
      case 'default':
        return {
          ...navbarModes,
          default: true,
        };
      case 'store':
        return {
          ...navbarModes,
          store: true,
        };
      case 'admin':
        return {
          ...navbarModes,
          admin: true,
        };

      default:
        return {
          ...navbarModes,
          default: true,
        };
    }
  }
);
