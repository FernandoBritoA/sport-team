import React, { useState, useEffect, useCallback } from 'react';
import './TeamPreview.scss';
import TeamPreviewItem from '../TeamPreviewItem/TeamPreviewItem';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSquad } from '../../Redux/teamData/teamData.selectors';

const TeamPreview = ({ squadMembers }) => {
  const [filteredPlayers, setFilteredPlayers] = useState(null);

  const filterPlayersByPosition = useCallback(
    (position) => {
      const fp = squadMembers.filter((member) => member.position === position);
      setFilteredPlayers(fp);
    },
    [squadMembers]
  );

  useEffect(() => {
    filterPlayersByPosition('Goalkeeper');
  }, [filterPlayersByPosition]);

  return (
    <div className='team-preview'>
      <select
        className='position-selector'
        onChange={(e) => {
          filterPlayersByPosition(e.target.value);
        }}
      >
        <option className='option-selector' value='Goalkeeper'>
          Goalkeepers
        </option>
        <option className='option-selector' value='Defender'>
          Defenders
        </option>
        <option className='option-selector' value='Midfielder'>
          Midfielders
        </option>
        <option className='option-selector' value='Attacker'>
          Attackers
        </option>
      </select>
      <div className='players-list'>
        {filteredPlayers
          ? filteredPlayers.map(({ ...props }, i) => (
              <TeamPreviewItem key={i} {...props} />
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  squadMembers: selectSquad,
});

export default connect(mapStateToProps)(TeamPreview);
