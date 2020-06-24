import footballDataActionTypes from './footballData.actionTypes';

const INITIAL_STATE = {
  PDStandings: null,
  isPDFetching: false,
  erorMessagePD: undefined,
  CLStandings: null,
  isCLFetching: false,
  errorMessageCL: undefined,
  lastResults: null,
  isLastResultsFetching: false,
  errorMessageLastResults: undefined,
  CLGroupMatches: null,
  isCLGroupMatchesFetching: false,
  errorMessageCLGroupMatches: undefined,
};

const footballDataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case footballDataActionTypes.FETCH_PD_STANDINGS_START:
      return {
        ...state,
        isPDFetching: true,
      };
    case footballDataActionTypes.FETCH_PD_STANDINGS_SUCCES:
      return {
        ...state,
        isPDFetching: false,
        PDStandings: payload,
      };
    case footballDataActionTypes.FETCH_PD_STANDINGS_FAILURE:
      return {
        ...state,
        isPDFetching: false,
        errorMessagePD: payload,
      };
    case footballDataActionTypes.FETCH_CL_STANDINGS_START:
      return {
        ...state,
        isCLFetching: true,
      };
    case footballDataActionTypes.FETCH_CL_STANDINGS_SUCCES:
      return {
        ...state,
        isCLFetching: false,
        CLStandings: payload,
      };
    case footballDataActionTypes.FETCH_CL_STANDINGS_FAILURE:
      return {
        ...state,
        isCLFetching: false,
        errorMessageCL: payload,
      };
    case footballDataActionTypes.FETCH_LAST_RESULTS_START:
      return {
        ...state,
        isLastResultsFetching: true,
      };
    case footballDataActionTypes.FETCH_LAST_RESULTS_SUCCES:
      return {
        ...state,
        isLastResultsFetching: false,
        lastResults: payload,
      };
    case footballDataActionTypes.FETCH_LAST_RESULTS_FAILURE:
      return {
        ...state,
        isLastResultsFetching: false,
        errorMessageLastResults: payload,
      };
    case footballDataActionTypes.FETCH_MATCH_OVERVIEW_START:
      return {
        ...state,
        isCLGroupMatchesFetching: true,
      };
    case footballDataActionTypes.FETCH_MATCH_OVERVIEW_SUCCES:
      return {
        ...state,
        isCLGroupMatchesFetching: false,
        CLGroupMatches: payload,
      };
    case footballDataActionTypes.FETCH_MATCH_OVERVIEW_FAILURE:
      return {
        ...state,
        isCLGroupMatchesFetching: false,
        errorMessageCLGroupMatches: payload,
      };
    default:
      return state;
  }
};
export default footballDataReducer;
