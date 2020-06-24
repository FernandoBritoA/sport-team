import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addItem } from '../../Redux/adminStore/adminStore.actions';
import { setAlert } from '../../Redux/alert/alert.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../Redux/storeData/storeData.selectors';

const AddSubcollectionsForm = ({ collections, addItem, setAlert }) => {
  const [itemData, setItemData] = useState({
    name: '',
    imageUrl: '',
    price: null,
  });

  const [collectionId, setCollectionId] = useState(collections[0]._id);

  const [subcollectionId, setSubcollectionId] = useState(
    collections[0].subcollections[0]._id
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    await addItem(itemData, collectionId, subcollectionId);
  };

  const onChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const idxDot = fileName.lastIndexOf('.') + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (
      extFile === 'jpg' ||
      extFile === 'jpeg' ||
      extFile === 'png' ||
      extFile === 'webp'
    ) {
      setItemData({ ...itemData, [e.target.name]: file });
    } else {
      setAlert('Please enter a valid image format', 'danger');
      const frm = document.getElementsByName('contact-form')[0];
      frm.reset();
    }
  };

  return (
    <div className='collections-form'>
      <h1 className='large text-primary'>Add Items</h1>
      <form className='form'>
        <div className='form-group'>
          <small className='form-text'>Select a Collection </small>
          <select
            name='collectionId '
            onChange={(e) => {
              setCollectionId(e.target.value);
              setSubcollectionId(
                collections.filter(({ _id }) => _id === e.target.value)[0]
                  .subcollections[0]._id
              );
            }}
          >
            {collections.map(({ name, _id }) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <small className='form-text'>Select a Subcollection </small>
          <select
            name='subcollectionId '
            onChange={(e) => setSubcollectionId(e.target.value)}
          >
            {collections
              .filter(({ _id }) => _id === collectionId)[0]
              .subcollections.map(({ name, _id }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div className='form-group'>
          <small className='form-text'>Item name: </small>
          <input
            type='text'
            placeholder='Item name'
            name='name'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <small className='form-text'>Image: : </small>
          <input
            type='file'
            name='imageUrl'
            accept='image/*'
            onChange={(e) => fileSelectHandler(e)}
          />
        </div>
        <div className='form-group'>
          <small className='form-text'>Price: </small>
          <input
            type='number'
            placeholder='Price'
            name='price'
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='button'
          value='Submit'
          className='btn btn-primary'
          onClick={onSubmit}
        />
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item, collectionId, subcollectionId) =>
    dispatch(addItem(item, collectionId, subcollectionId)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubcollectionsForm);
