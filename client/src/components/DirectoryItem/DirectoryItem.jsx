import React from 'react';
import './DirectoryItem.scss';
import { withRouter } from 'react-router-dom';

const DirectoryItem = ({ name, imageUrl, history, match }) => {
  const formatToLink = (word) => {
    const newWord = word.replace(`'`, '');
    return newWord.toLowerCase();
  };

  return (
    <div
      className='directory-item'
      onClick={() => history.push(`${match.url}/${formatToLink(name)}`)}
    >
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='content'>
        <h1 className='title'>{name.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(DirectoryItem);
