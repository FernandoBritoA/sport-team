import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addSubcollection } from '../../Redux/adminStore/adminStore.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../Redux/storeData/storeData.selectors';

const AddSubcollectionsForm = ({ collections, addSubcollection }) => {
  const [subcollectionName, setSubcollectionName] = useState({
    name: '',
  });
  const [collectionId, setCollectionId] = useState(collections[0]._id);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addSubcollection(subcollectionName, collectionId);
  };

  return (
    <div className='collections-form'>
      <h1 className='large text-primary'>Add a subcollection</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <small className='form-text'>Select a Collection </small>
          <select
            name='collectionId '
            onChange={(e) => setCollectionId(e.target.value)}
          >
            {collections.map(({ name, _id }) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <small className='form-text'>Subcollection name: </small>
          <input
            type='text'
            placeholder='Subcollection'
            name='subcollection'
            onChange={(e) => setSubcollectionName({ name: e.target.value })}
          />
        </div>
        <input type='submit' className='btn btn-primary ' />
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  addSubcollection: (subcollection, collectionId) =>
    dispatch(addSubcollection(subcollection, collectionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubcollectionsForm);
