import storeDataActionTypes from './storeData.actionTypes';

const INITIAL_STATE = {
  collections: null,
  isStoreDataFetching: false,
  storeDataErrors: undefined,
};

const storeDataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case storeDataActionTypes.FETCH_STORE_DATA_START:
      return {
        ...state,
        isStoreDataFetching: true,
      };
    case storeDataActionTypes.FETCH_STORE_DATA_SUCCESS:
      return {
        ...state,
        isStoreDataFetching: false,
        collections: payload,
      };
    case storeDataActionTypes.FETCH_STORE_DATA_FAILURE:
      return {
        ...state,
        isStoreDataFetching: false,
        storeDataErrors: payload,
      };

    default:
      return state;
  }
};
export default storeDataReducer;
