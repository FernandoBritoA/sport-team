import React from 'react';
import groupPhoto from '../../images/group-photo.png';
import './TeamItemsContainer.scss';
import TeamPreview from '../TeamPreview/TeamPreview';
import CardSections from '../CardSections/CardSections';
import LazyBackground from '../LazyBackground/LazyBackground';

const TeamItemsContainer = () => {
  const playerPositions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
  return (
    <div className='team-items-container'>
      <h1 className='team-title'>First Team</h1>
      <div className='photo-preview'>
        <div className='team-photo-container'>
          <LazyBackground source={groupPhoto} cn={'team-photo'} />
        </div>
        <TeamPreview />
      </div>
      <div className='cards-sections-container'>
        {playerPositions.map((position) => (
          <CardSections key={position} position={position} />
        ))}
      </div>
    </div>
  );
};

export default TeamItemsContainer;
