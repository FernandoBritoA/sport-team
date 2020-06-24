import React from 'react';
import './Directory.scss';
import DirectoryItem from '../DirectoryItem/DirectoryItem';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../Redux/storeData/storeData.selectors';

const Directory = ({ collections }) => {
  return (
    <div className='directory'>
      <ImageCarousel />

      {collections.map(({ _id, name, imageUrl }) => (
        <DirectoryItem key={_id} name={name} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(Directory);
