import React, { Fragment } from 'react';
import './TabItem.scss';
import atletiLogo from '../../images/atleti-logo.png';

const TableItem = ({ competition, ...otherProps }) => {
  const {
    id,
    position,
    name,
    logo,
    playedGames,
    won,
    draw,
    lost,
    points,
  } = otherProps;

  return (
    <Fragment>
      <tr
        className={
          !(position % 2 === 0) ? `a${competition}` : `b${competition}`
        }
      >
        <td>{position}</td>
        <td>
          <div className='team'>
            <img
              className='image'
              src={id !== 78 ? logo : atletiLogo}
              alt=''
              width={'30px'}
              height={'30px'}
            />
            <div className='name'>{name}</div>
          </div>
        </td>

        <td>{playedGames}</td>
        <td>{won}</td>
        <td>{draw}</td>
        <td>{lost}</td>
        <td>{points}</td>
      </tr>
    </Fragment>
  );
};

export default TableItem;
