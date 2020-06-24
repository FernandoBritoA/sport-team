import React from 'react';
import './TeamPreviewItem.scss';

const TeamPreviewItem = ({ ...props }) => {
  const { name, shirtNumber } = props;

  return (
    <div className='team-preview-item'>
      <span className='player-number'>{shirtNumber}</span>
      <span className='player-name'>{name}</span>
    </div>
  );
};

export default TeamPreviewItem;
