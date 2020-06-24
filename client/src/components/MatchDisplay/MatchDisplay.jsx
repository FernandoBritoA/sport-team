import React from 'react';
import './MatchDisplay.scss';
const MatchDisplay = ({ ...otherProps }) => {
  const {
    group,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    status,
    date,
  } = otherProps;

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
  return (
    <div className='match-container'>
      <div className='date'>{`${day} ${month} ${year}`}</div>
      <div className='group-score-container'>
        <div className='group-container'>
          <h4 className='group-name'>Group</h4>
          <span className='group-letter'>{group.slice(-1)}</span>
        </div>

        <div className='score-status-container'>
          <div className='teama'>{homeTeam}</div>
          <div className='score-status'>
            <span className='score'>
              {homeScore} - {awayScore}
            </span>
            <div className='status'>{status}</div>
          </div>
          <div className='teamb'>{awayTeam}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
