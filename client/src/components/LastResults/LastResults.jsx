import React from 'react';
import './LastResults.scss';
import ResultDisplay from '../ResultDisplay/ResultDisplay';
import wandaMetropolitano from '../../images/wanda-metropolitano-background.jpg';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLastResults } from '../../Redux/footballData/footballData.selectors';

const LastResults = ({ lastResults }) => {
  return (
    <div className='box-background'>
      <div
        className='box-background-image'
        style={{
          backgroundImage: `url(${wandaMetropolitano})`,
        }}
      />
      <div className='last-results-container'>
        <div className='box-title-container'>
          <div className='box-title'>Recent Matches</div>
          <div className='box-end-title'>Next Match</div>
        </div>

        <div className='results-display-boxes-container'>
          {lastResults.map(({ ...otherProps }, i) => (
            <ResultDisplay key={i} {...otherProps} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  lastResults: selectLastResults,
});

export default connect(mapStateToProps)(LastResults);
