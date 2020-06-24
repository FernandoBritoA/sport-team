import footballDataActionTypes from './footballData.actionTypes';
import axios from 'axios';

//*THUNKS
//*PDStandings
export const fetchPDStandingsStart = () => ({
  type: footballDataActionTypes.FETCH_PD_STANDINGS_START,
});

export const fetchPDStandingsSuccess = (standings) => ({
  type: footballDataActionTypes.FETCH_PD_STANDINGS_SUCCES,
  payload: standings,
});

export const fetchPDStandingsFailure = (errorMessage) => ({
  type: footballDataActionTypes.FETCH_PD_STANDINGS_FAILURE,
  payload: errorMessage,
});

export const fetchPDStandings = () => {
  return async (dispatch) => {
    dispatch(fetchPDStandingsStart());
    try {
      const response = await axios.get(
        'https://pacific-retreat-49876.herokuapp.com/api/footballData/PDstandings'
      );
      const standings = response.data;
      dispatch(fetchPDStandingsSuccess(standings));
    } catch (error) {
      if (error.name !== 'AbortError') {
        dispatch(fetchPDStandingsFailure(error.message));
      } else {
        dispatch(fetchPDStandingsFailure('Request was cancelled'));
      }
    }
  };
};

//*CLStandings
export const fetchCLStandingsStart = () => ({
  type: footballDataActionTypes.FETCH_CL_STANDINGS_START,
});

export const fetchCLStandingsSuccess = (standings) => ({
  type: footballDataActionTypes.FETCH_CL_STANDINGS_SUCCES,
  payload: standings,
});

export const fetchCLStandingsFailure = (errorMessage) => ({
  type: footballDataActionTypes.FETCH_CL_STANDINGS_FAILURE,
  payload: errorMessage,
});

export const fetchCLStandings = () => {
  return async (dispatch) => {
    dispatch(fetchCLStandingsStart());
    try {
      const response = await axios.get(
        'https://pacific-retreat-49876.herokuapp.com/api/footballData/CLstandings'
      );
      const tables = await response.data;
      dispatch(fetchCLStandingsSuccess(tables));
    } catch (error) {
      if (error.name !== 'AbortError') {
        dispatch(fetchCLStandingsFailure(error.message));
      } else {
        dispatch(fetchCLStandingsFailure('Request was cancelled'));
      }
    }
  };
};

//*LastResults
export const fetchLastResultsStart = () => ({
  type: footballDataActionTypes.FETCH_LAST_RESULTS_START,
});

export const fetchLastResultsSuccess = (lastResults) => ({
  type: footballDataActionTypes.FETCH_LAST_RESULTS_SUCCES,
  payload: lastResults,
});

export const fetchLastResultsFailure = (errorMessage) => ({
  type: footballDataActionTypes.FETCH_LAST_RESULTS_FAILURE,
  payload: errorMessage,
});

export const fetchLastResults = (nextMonthDates) => {
  return async (dispatch) => {
    dispatch(fetchLastResultsStart());
    try {
      const response = await axios.get(
        `https://pacific-retreat-49876.herokuapp.com/api/footballData/lastResults/${nextMonthDates}`
      );
      const lastResults = await response.data;

      dispatch(fetchLastResultsSuccess(lastResults));
    } catch (error) {
      dispatch(fetchLastResultsFailure(error.message));
    }
  };
};

//* MatchOverview
export const fetchMatchOverviewStart = () => ({
  type: footballDataActionTypes.FETCH_MATCH_OVERVIEW_START,
});

export const fetchMatchOverviewSuccess = (results) => ({
  type: footballDataActionTypes.FETCH_MATCH_OVERVIEW_SUCCES,
  payload: results,
});

export const fetchMatchOverviewFailure = (errorMessage) => ({
  type: footballDataActionTypes.FETCH_MATCH_OVERVIEW_FAILURE,
  payload: errorMessage,
});

export const fetchMatchOverview = () => {
  return async (dispatch) => {
    dispatch(fetchMatchOverviewStart());
    try {
      const response = await axios.get(
        'https://pacific-retreat-49876.herokuapp.com/api/footballData/matchOV'
      );
      const teamMatches = await response.data;

      dispatch(fetchMatchOverviewSuccess(teamMatches));
    } catch (error) {
      dispatch(fetchMatchOverviewFailure(error.message));
    }
  };
};
