import alertActionTypes from './alert.actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case alertActionTypes.SET_ALERT:
      return [...state, payload];
    case alertActionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
