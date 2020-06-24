import { createSelector } from 'reselect';

const selectTeamData = (state) => state.teamData;

export const selectCurrentPlayersInfo = createSelector(
  [selectTeamData],
  (teamData) => teamData.currentPlayersInfo
);

export const selectIsTeamDataFetching = createSelector(
  [selectTeamData],
  (teamData) => teamData.isTeamDataFetching
);

export const selectSquad = createSelector([selectTeamData], (teamData) => {
  return teamData.squad
    ? teamData.squad.map((teamMember) => {
        const { name } = teamMember;
        switch (name) {
          case 'Alex dos Santos':
            return { ...teamMember, shirtNumber: 37 };
          case 'José Maria Giménez':
            return { ...teamMember, name: 'J.M. Giménez' };
          case 'Renan Lodi':
            return { ...teamMember, shirtNumber: 12 };
          case 'Kieran Trippier':
            return { ...teamMember, shirtNumber: 23 };
          case 'Santiago Arias':
            return { ...teamMember, shirtNumber: 4 };
          case 'Felipe':
            return { ...teamMember, shirtNumber: 18 };
          case 'Teye Partey':
            return { ...teamMember, shirtNumber: 5 };
          case 'Saúl':
            return { ...teamMember, shirtNumber: 8 };
          case 'Yannick Carrasco':
            return { ...teamMember, shirtNumber: 21 };
          case 'João Félix':
            return { ...teamMember, shirtNumber: 7 };
          case 'Thomas Lemar':
            return { ...teamMember, shirtNumber: 11 };
          case 'Álvaro Morata':
            return { ...teamMember, shirtNumber: 9 };
          default:
            return teamMember;
        }
      })
    : null;
});

export const selectSquadIsLoaded = createSelector(
  [selectTeamData],
  (teamData) => !!teamData.squad
); //!! convert to boolean value
