import { createSelector } from 'reselect';

const selectStateAlerts = (state) => state.alerts;

export const selectAlerts = createSelector([selectStateAlerts], (alerts) =>
  alerts ? alerts : null
);
