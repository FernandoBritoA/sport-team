import React, { useEffect } from 'react';
import './TeamCard.scss';
import moment from 'moment';
import defaultPP from '../../images/defaultPP.jpg';

import { connect } from 'react-redux';
import { setCurrentPlayerInfo } from '../../Redux/teamData/teamData.actions';

const TeamCard = ({ setCurrentPlayerInfo, ...props }) => {
  const { name, shirtNumber, position, dateOfBirth, nationality } = props;
  useEffect(() => {
    const {
      name,
      shirtNumber,
      position,
      dateOfBirth,
      nationality,
      active,
    } = props;
    if (active) {
      switch (position) {
        case 'Goalkeeper':
          setCurrentPlayerInfo({
            goalkeeper: {
              name,
              shirtNumber,
              position,
              dateOfBirth,
              nationality,
            },
          });
          break;
        case 'Defender':
          setCurrentPlayerInfo({
            defender: {
              name,
              shirtNumber,
              position,
              dateOfBirth,
              nationality,
            },
          });
          break;
        case 'Midfielder':
          setCurrentPlayerInfo({
            midfielder: {
              name,
              shirtNumber,
              position,
              dateOfBirth,
              nationality,
            },
          });
          break;
        case 'Attacker':
          setCurrentPlayerInfo({
            attacker: {
              name,
              shirtNumber,
              position,
              dateOfBirth,
              nationality,
            },
          });
          break;

        default:
          break;
      }
    }
  }, [setCurrentPlayerInfo, props]);
  const shortName = (nameString) => {
    const n = nameString.split(' ');
    return n[n.length - 1];
  };

  return (
    <div className='flip-card '>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>
          <div className={`top-shirt ${position}`}>
            <span className='shirt-name '>{shortName(name)}</span>
            <span className='shirt-number'>{shirtNumber}</span>
          </div>
          <div className={`shirt-stripes ${position}`} />
        </div>
        <div className='flip-card-back'>
          <div className='player-image-container'>
            <img className='player-image' src={defaultPP} alt='' />
          </div>
          <div className='player-info'>
            <span>
              <span className='base-info'>Name: </span>
              {name}
            </span>
            <span>
              <span className='base-info'>Born: </span>
              {moment.utc(dateOfBirth).format('YYYY/MM/DD')}
            </span>
            <span>
              <span className='base-info'>Position: </span>
              {position}
            </span>
            <span>
              <span className='base-info'>Nationality: </span>
              {nationality}
            </span>
            <span>
              <span className='base-info'>Shirt #: </span>
              {shirtNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentPlayerInfo: (playerInfo) =>
    dispatch(setCurrentPlayerInfo(playerInfo)),
});

export default connect(null, mapDispatchToProps)(TeamCard);
