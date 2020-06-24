import storeDataActionTypes from './storeData.actionTypes';
import axios from 'axios';

//* Store Data
const fetchStoreDataStart = () => ({
  type: storeDataActionTypes.FETCH_STORE_DATA_START,
});

const fetchStoreDataSuccess = (results) => ({
  type: storeDataActionTypes.FETCH_STORE_DATA_SUCCESS,
  payload: results,
});

const fetchStoreDataFailure = (errorMessage) => ({
  type: storeDataActionTypes.FETCH_STORE_DATA_FAILURE,
  payload: errorMessage,
});

export const fetchStoreData = () => {
  return async (dispatch) => {
    dispatch(fetchStoreDataStart());
    try {
      const response = await axios.get(
        'https://pacific-retreat-49876.herokuapp.com/api/collections'
      );
      const data = await response.data;

      dispatch(fetchStoreDataSuccess(data));
    } catch (error) {
      dispatch(fetchStoreDataFailure(error.message));
    }
  };
};
