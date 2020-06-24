import React from 'react';
import './ResultDisplay.scss';
import atletiLogo from '../../images/atleti-logo.png';
import laLigaLogo from '../../images/laliga-logo.png';
import championsLogo from '../../images/champions-logo.png';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTeamLogos } from '../../Redux/footballData/footballData.selectors';

const ResultDisplay = ({ teamLogos, ...otherProps }) => {
  const {
    date,
    competition,
    homeTeamID,
    awayTeamID,
    homeScore,
    awayScore,
    status,
  } = otherProps;

  const getDate = () => {
    const newDate = new Date(date.slice(0, 10));
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[newDate.getMonth()];
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getHomeTeamLogo = () => {
    if (homeTeamID === 78) {
      return atletiLogo;
    } else {
      const awayTeam = teamLogos
        ? teamLogos.find((team) => team.id === homeTeamID)
        : null;
      return awayTeam ? awayTeam.logo : null;
    }
  };
  //
  const getAwayTeamLogo = () => {
    if (awayTeamID === 78) {
      return atletiLogo;
    } else {
      const homeTeam = teamLogos
        ? teamLogos.find((team) => team.id === awayTeamID)
        : null;
      return homeTeam ? homeTeam.logo : null;
    }
  };

  return (
    <div className='score-box'>
      <span className='next-match-date'>{`${getDate()} | ${status}`}</span>
      <div className='result-container'>
        <div>
          <img
            className='team-logo'
            src={getHomeTeamLogo()}
            alt=''
            width='70px'
            height='70px'
          />
        </div>
        <div className='score-container'>
          {status === 'FINISHED' ? `${homeScore} - ${awayScore}` : '  VS  '}
        </div>
        <div>
          <img
            className='team-logo'
            src={getAwayTeamLogo()}
            alt=''
            width='70px'
            height='70px'
          />
        </div>
      </div>
      <div className='competition-container'>
        <img
          className='competition-image'
          src={
            competition === 'UEFA Champions League' ? championsLogo : laLigaLogo
          }
          alt=''
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamLogos: selectTeamLogos,
});

export default connect(mapStateToProps)(ResultDisplay);
