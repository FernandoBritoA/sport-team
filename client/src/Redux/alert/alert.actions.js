import { v4 as uuidv4 } from 'uuid'; //random IDs
import alertActionTypes from './alert.actionTypes';

export const setAlert = (msg, alertType, timeOut = 5000) => (dispatch) => {
  const id = uuidv4(); //random IDs
  dispatch({
    type: alertActionTypes.SET_ALERT,
    payload: { id, msg, alertType },
  });

  setTimeout(
    () =>
      dispatch({
        type: alertActionTypes.REMOVE_ALERT,
        payload: id,
      }),
    timeOut
  );
};
