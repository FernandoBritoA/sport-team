import { createSelector } from 'reselect';

const selectUserData = (state) => state.user;

export const selectIsAuthenticated = createSelector(
  [selectUserData],
  (userData) => userData.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectUserData],
  (userData) => userData.loading
);

export const selectIsAdmin = createSelector(
  [selectUserData],
  (userData) => userData.admin
);
