import teamDataActionTypes from './teamData.actionTypes';

const INITIAL_STATE = {
  squad: null,
  isTeamDataFetching: false,
  errorMessage: undefined,
  currentPlayersInfo: {
    goalkeeper: null,
    defender: null,
    midfielder: null,
    attacker: null,
  },
};

const teamDataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case teamDataActionTypes.FETCH_TEAM_DATA_START:
      return {
        ...state,
        isTeamDataFetching: true,
      };
    case teamDataActionTypes.FETCH_TEAM_DATA_SUCCESS:
      return {
        ...state,
        isTeamDataFetching: false,
        squad: payload,
      };
    case teamDataActionTypes.FETCH_TEAM_DATA_FAILURE:
      return {
        ...state,
        isTeamDataFetching: false,
        errorMessage: payload,
      };
    case teamDataActionTypes.SET_CURRENT_PLAYER_INFO:
      return {
        ...state,
        currentPlayersInfo: { ...state.currentPlayersInfo, ...payload },
      };
    default:
      return state;
  }
};
export default teamDataReducer;
