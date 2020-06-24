import React from 'react';
import './CollectionPage.scss';
import { Link } from 'react-router-dom';
import Subcollection from '../../components/Subcollection/Subcollection';

import { connect } from 'react-redux';
import { selectCollection } from '../../Redux/storeData/storeData.selectors';

const CollectionPage = ({ collection }) => {
  const { name, subcollections } = collection;
  return (
    <div className='collection-page'>
      <div className='button-title'>
        <Link to='/store' className='go-back-btn'>
          <i className='fas fa-arrow-alt-circle-left' />{' '}
          <div className='go-back'> Go Back</div>
        </Link>
        <h2 className='title'>{name}</h2>
      </div>

      <div className='subcollections'>
        {subcollections.map(({ _id, ...props }) => (
          <Subcollection key={_id} {...props} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state),
    //this is necessary because unlike other selectors,
    //this selector needs a part of the state depending on the URL parameter
  };
};

export default connect(mapStateToProps)(CollectionPage);
