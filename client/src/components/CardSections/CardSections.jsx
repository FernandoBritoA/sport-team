import React, { useEffect, useState } from 'react';
import './CardSections.scss';
import SlideShow from '../Slideshow/Slideshow';
import goalkeeper from '../../images/goalkeeper.png';
import defender from '../../images/defender.png';
import midfielder from '../../images/midfielder.png';
import attacker from '../../images/attacker.png';
import moment from 'moment';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentPlayersInfo } from '../../Redux/teamData/teamData.selectors';

const CardSections = ({ position, currentPlayersInfo }) => {
  const imageSelector = (position) => {
    switch (position) {
      case 'Goalkeeper':
        return goalkeeper;
      case 'Defender':
        return defender;
      case 'Midfielder':
        return midfielder;
      case 'Attacker':
        return attacker;
      default:
        break;
    }
  };

  useEffect(() => {
    const playerInfoSelector = (position) => {
      switch (position) {
        case 'Goalkeeper':
          return currentPlayersInfo.goalkeeper;
        case 'Defender':
          return currentPlayersInfo.defender;
        case 'Midfielder':
          return currentPlayersInfo.midfielder;
        case 'Attacker':
          return currentPlayersInfo.attacker;
        default:
          break;
      }
    };

    setPlayerInfo(playerInfoSelector(position));
  }, [position, currentPlayersInfo]);

  const [playerInfo, setPlayerInfo] = useState(null);

  return (
    <div className='card-sections'>
      <h1 className='card-section-title'>{position + 's'}</h1>
      <div className='team-cards-container'>
        <div className='slides-overview'>
          <SlideShow position={position} />
        </div>
        <div className='position-image'>
          {playerInfo ? (
            <div className='playerInfo'>
              <h2>{playerInfo.name}</h2>
              <h3>
                Nationality: <span>{playerInfo.nationality}</span>
              </h3>
              <h3>
                Born:{' '}
                <span>
                  {moment.utc(playerInfo.dateOfBirth).format('YYYY/MM/DD')}
                </span>
              </h3>
              <h3>
                Position: <span>{playerInfo.position}</span>
              </h3>
            </div>
          ) : null}
          <img src={imageSelector(position)} alt='' style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentPlayersInfo: selectCurrentPlayersInfo,
});

export default connect(mapStateToProps)(CardSections);
