import React, { useEffect } from 'react';
import './LeagueTable.scss';
import TableItem from '../TableItem/TableItem';
import MatchOverview from '../MatchOverview/MatchOverview';
import WithSpinner from '../WithSpinner/WithSpinner';

import { connect } from 'react-redux';
import { fetchMatchOverview } from '../../Redux/footballData/footballData.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectPDStandings,
  selectCLStandings,
  selectIsCLGroupMatchesLoaded,
} from '../../Redux/footballData/footballData.selectors';

const MatchOverviewWithSpinner = WithSpinner(MatchOverview);

const LeagueTable = ({
  match,
  PDStandings,
  CLStandings,
  fetchMatchOverview,
  isCLGroupMatchesLoaded,
}) => {
  useEffect(() => {
    if (!isCLGroupMatchesLoaded) {
      fetchMatchOverview();
    }
  }, [fetchMatchOverview, isCLGroupMatchesLoaded]);

  //Competition selector
  const competition = match.path.slice(7);

  return (
    <div className='table-container'>
      <table className='league-table'>
        <thead className={`head${competition}`}>
          <tr>
            <th> </th>
            <th>
              <div className='team'>Team</div>
            </th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {competition === 'liga'
            ? PDStandings.map(({ ...otherProps }, i) => (
                <TableItem key={i} competition={competition} {...otherProps} />
              ))
            : CLStandings.map(({ ...otherProps }, i) => (
                <TableItem key={i} competition={competition} {...otherProps} />
              ))}
        </tbody>
      </table>
      {competition === 'champions' ? (
        <MatchOverviewWithSpinner isLoading={!isCLGroupMatchesLoaded} />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  PDStandings: selectPDStandings,
  CLStandings: selectCLStandings,
  isCLGroupMatchesLoaded: selectIsCLGroupMatchesLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMatchOverview: () => dispatch(fetchMatchOverview()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
