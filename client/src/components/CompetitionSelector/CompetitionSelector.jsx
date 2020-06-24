import React from 'react';
import './CompetitionSelector.scss';
import { Link } from 'react-router-dom';

const CompetitionSelector = () => {
  return (
    <div className='tab'>
      <Link to='/stats/liga'>
        <button className='tablink'>La Liga</button>
      </Link>

      <Link to='/stats/champions'>
        <button className='tablink'>Champions League</button>
      </Link>
    </div>
  );
};

export default CompetitionSelector;
