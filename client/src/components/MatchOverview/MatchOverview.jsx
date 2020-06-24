import React from 'react';
import './MatchOverview.scss';
import MatchDisplay from '../MatchDisplay/MatchDisplay';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCLGroupMatches } from '../../Redux/footballData/footballData.selectors';

const MatchOverview = ({ CLGroupMatches }) => {
  return (
    <div className='match-overview'>
      <h1 className='matches-title'>Matches</h1>
      {CLGroupMatches.map(({ ...otherProps }, i) => (
        <MatchDisplay key={i} {...otherProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  CLGroupMatches: selectCLGroupMatches,
});

export default connect(mapStateToProps)(MatchOverview);
