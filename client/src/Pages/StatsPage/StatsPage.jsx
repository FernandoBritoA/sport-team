import React, { useEffect } from 'react';
import './StatsPage.scss';
import { Route } from 'react-router-dom';
import CompetitionSelector from '../../components/CompetitionSelector/CompetitionSelector';
import LeagueTable from '../../components/LeagueTable/LeagueTable';
import WithSpinner from '../../components/WithSpinner/WithSpinner';

import { connect } from 'react-redux';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectAreStandingsFetching,
  selectIsPDStandingsLoaded,
  selectIsCLStandingsLoaded,
} from '../../Redux/footballData/footballData.selectors';
import {
  fetchPDStandings,
  fetchCLStandings,
} from '../../Redux/footballData/footballData.actions';

const LeagueTableWithSpinner = WithSpinner(LeagueTable);

const StatsPage = ({
  match,
  fetchPDStandings,
  isPDStandingsLoaded,
  fetchCLStandings,
  isCLStandingsLoaded,
  areStandingsFetching,
  setNavbarMode,
}) => {
  useEffect(() => {
    setNavbarMode('default');
    if (!areStandingsFetching) {
      if (!isPDStandingsLoaded) {
        fetchPDStandings();
      }
      if (!isCLStandingsLoaded) {
        fetchCLStandings();
      }
    }
  }, [
    fetchPDStandings,
    fetchCLStandings,
    isCLStandingsLoaded,
    isPDStandingsLoaded,
    areStandingsFetching,
    setNavbarMode,
  ]);
  return (
    <div className='tab-table-container'>
      {isPDStandingsLoaded && isCLStandingsLoaded ? (
        <CompetitionSelector />
      ) : null}
      <Route
        exact
        path={`${match.path}/liga`}
        render={(props) => (
          <LeagueTableWithSpinner isLoading={!isPDStandingsLoaded} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/champions`}
        render={(props) => (
          <LeagueTableWithSpinner isLoading={!isCLStandingsLoaded} {...props} />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  areStandingsFetching: selectAreStandingsFetching,
  isPDStandingsLoaded: selectIsPDStandingsLoaded,
  isCLStandingsLoaded: selectIsCLStandingsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPDStandings: () => dispatch(fetchPDStandings()),
  fetchCLStandings: () => dispatch(fetchCLStandings()),
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
