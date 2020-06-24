import { createSelector } from 'reselect';

const selectFootballData = (state) => state.footballData;

export const selectAreStandingsFetching = createSelector(
  [selectFootballData],
  (footballData) => footballData.isCLFetching || footballData.isPDFetching
);

//*PDStandings
export const selectPDStandings = createSelector(
  [selectFootballData],
  (footballData) =>
    footballData.PDStandings
      ? footballData.PDStandings.map((team) => ({
          id: team.team.id,
          position: team.position,
          name: team.team.name,
          logo: team.team.crestUrl,
          playedGames: team.playedGames,
          won: team.won,
          draw: team.draw,
          lost: team.lost,
          points: team.points,
        }))
      : null
);

export const selectIsPDStandingsLoaded = createSelector(
  [selectFootballData],
  (footballData) => !!footballData.PDStandings
); //!! convert to boolean value

//*CLStandings
export const selectCLStandings = createSelector(
  [selectFootballData],
  (footballData) =>
    footballData.CLStandings
      ? footballData.CLStandings[3].map((team) => ({
          id: team.team.id,
          position: team.position,
          name: team.team.name,
          logo: team.team.crestUrl,
          playedGames: team.playedGames,
          won: team.won,
          draw: team.draw,
          lost: team.lost,
          points: team.points,
        }))
      : null
);

export const selectIsCLStandingsLoaded = createSelector(
  [selectFootballData],
  (footballData) => !!footballData.CLStandings
); //!! convert to boolean value

//*LastResults
export const selectLastResults = createSelector(
  [selectFootballData],
  (footballData) =>
    footballData.lastResults.map((match) => ({
      date: match.utcDate,
      competition: match.competition.name,
      homeTeamID: match.homeTeam.id,
      awayTeamID: match.awayTeam.id,
      homeScore: match.score.fullTime.homeTeam,
      awayScore: match.score.fullTime.awayTeam,
      status: match.status,
    }))
);

export const selectIsLastResultsLoaded = createSelector(
  [selectFootballData],
  (footballData) => !!footballData.lastResults
);

export const selectTeamLogos = createSelector(
  [selectPDStandings, selectFootballData],
  (PDStandings, footballData) => {
    if (!!PDStandings && !!footballData.CLStandings) {
      const pdTeams = PDStandings.map((team) => ({
        id: team.id,
        logo: team.logo,
      }));

      const clTeams = footballData.CLStandings.map((group) =>
        group.map((team) => ({
          id: team.team.id,
          logo: team.team.crestUrl,
        }))
      );
      pdTeams.push(...clTeams.flat(2));
      return pdTeams;
    } else {
      return;
    }
  }
);

//* Match Overview
export const selectCLGroupMatches = createSelector(
  [selectFootballData],
  (footballData) =>
    footballData.CLGroupMatches
      ? footballData.CLGroupMatches.map((match) => ({
          group: match.group,
          matchday: match.matchday,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          homeScore: match.score.fullTime.homeTeam,
          awayScore: match.score.fullTime.awayTeam,
          status: match.status,
          date: match.utcDate,
        }))
      : null
);

export const selectIsCLGroupMatchesLoaded = createSelector(
  [selectFootballData],
  (footballData) => !!footballData.CLGroupMatches
);
