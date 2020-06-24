import React, { useEffect } from 'react';
import './TeamPage.scss';
import { Route } from 'react-router-dom';
import WithSpinner from '../../components/WithSpinner/WithSpinner';
import TeamItemsContainer from '../../components/TeamItemsContainer/TeamItemsContainer';

import { connect } from 'react-redux';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { fetchTeamData } from '../../Redux/teamData/teamData.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectSquad,
  selectSquadIsLoaded,
} from '../../Redux/teamData/teamData.selectors';

const TeamItemsContainerWithSpinner = WithSpinner(TeamItemsContainer);

const TeamPage = ({
  match,
  fetchTeamData,
  teamData,
  squadIsLoaded,
  setNavbarMode,
}) => {
  useEffect(() => {
    setNavbarMode('default');
    fetchTeamData();
  }, [fetchTeamData, setNavbarMode]);
  return (
    <div className='team-page'>
      {
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <TeamItemsContainerWithSpinner
              isLoading={!squadIsLoaded}
              {...props}
            />
          )}
        />
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamData: selectSquad,
  squadIsLoaded: selectSquadIsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamData: () => dispatch(fetchTeamData()),
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
