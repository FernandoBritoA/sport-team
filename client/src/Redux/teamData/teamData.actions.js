import teamDataActionTypes from './teamData.actionTypes';
import axios from 'axios';

//*Set Current Player Info
export const setCurrentPlayerInfo = (playerInfo) => ({
  type: teamDataActionTypes.SET_CURRENT_PLAYER_INFO,
  payload: playerInfo,
});

//* Team Data
const fetchTeamDataStart = () => ({
  type: teamDataActionTypes.FETCH_TEAM_DATA_START,
});

const fetchTeamDataSuccess = (results) => ({
  type: teamDataActionTypes.FETCH_TEAM_DATA_SUCCESS,
  payload: results,
});

const fetchTeamDataFailure = (errorMessage) => ({
  type: teamDataActionTypes.FETCH_TEAM_DATA_FAILURE,
  payload: errorMessage,
});

export const fetchTeamData = () => {
  return async (dispatch) => {
    dispatch(fetchTeamDataStart());
    try {
      const response = await axios.get(
        'https://pacific-retreat-49876.herokuapp.com/api/footballData/teamData'
      );
      const squad = await response.data;

      dispatch(fetchTeamDataSuccess(squad));
    } catch (error) {
      dispatch(fetchTeamDataFailure(error.message));
    }
  };
};
