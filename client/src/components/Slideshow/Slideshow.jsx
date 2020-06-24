import React, { useState } from 'react';
import './Slideshow.scss';
import TeamCard from '../TeamCard/TeamCard';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSquad } from '../../Redux/teamData/teamData.selectors';

const Slideshow = ({ position, teamMembers }) => {
  const originalArray = teamMembers
    .filter((teamMember) => teamMember.position === position)
    .map((teamMember, i) => {
      return i === 0
        ? {
            ...teamMember,
            display: 'flex',
            active: 'active',
            animation: 'animate__fadeInLeft',
          }
        : { ...teamMember, display: 'none', active: null, animation: null };
    });

  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesArray, setSlidesArray] = useState(originalArray);

  const selectDot = (i) => {
    setSlideIndex(i);
    modifyArray(i);
  };

  const nextItem = () => {
    let index = slideIndex;
    if (index === originalArray.length - 1) {
      index = 0;
    } else {
      index++;
    }
    setSlideIndex(index);
    modifyArray(index, 'toRight');
  };

  const previousItem = () => {
    let index = slideIndex;
    if (index === 0) {
      index = originalArray.length - 1;
    } else {
      index--;
    }
    setSlideIndex(index);
    modifyArray(index, 'toLeft');
  };

  const modifyArray = (i, direction) => {
    const newArray = [...originalArray];

    newArray[0].display = 'none';
    newArray[0].active = null;
    newArray[0].animation = null;
    newArray[i].display = 'flex';
    newArray[i].active = 'active';

    switch (direction) {
      case 'toRight':
        newArray[i].animation = 'animate__fadeInLeft';
        newArray[slideIndex].display = 'flex';
        newArray[slideIndex].animation = 'animate__fadeOutRight';
        break;
      case 'toLeft':
        newArray[i].animation = 'animate__fadeInRight';
        newArray[slideIndex].display = 'flex';
        newArray[slideIndex].animation = 'animate__fadeOutLeft';
        break;
      default:
        break;
    }
    setSlidesArray(newArray);
  };

  return (
    <div className='slideshow-container'>
      <div className='slideshow'>
        {slidesArray.map(({ id, display, animation, ...props }) => (
          <div
            style={{ width: '100%', display: display }}
            className={`slide animate__animated ${animation} `}
            key={id}
          >
            <TeamCard {...props} />
          </div>
        ))}

        <button className='prev' onClick={() => previousItem()}>
          &#10094;
        </button>
        <button className='next' onClick={() => nextItem()}>
          &#10095;
        </button>
      </div>

      <div className='dot-container'>
        {slidesArray.map(({ active }, i) => (
          <span
            key={i}
            className={`dot ${active}`}
            onClick={() => selectDot(i)}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  teamMembers: selectSquad,
});

export default connect(mapStateToProps)(Slideshow);
