import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addCollection } from '../../Redux/adminStore/adminStore.actions';
import { setAlert } from '../../Redux/alert/alert.actions';

const AddCollectionsForm = ({ addCollection, fetchStoreData, setAlert }) => {
  const [collectionData, setCollectionData] = useState({
    name: '',
    imageUrl: '',
  });

  const onSubmit = async () => {
    await addCollection(collectionData);
    setCollectionData({
      name: '',
      imageUrl: '',
    });
    const frm = document.getElementsByName('contact-form')[0];
    //check
    // @ts-ignore
    frm.reset();
  };

  const onChange = (e) => {
    setCollectionData({ ...collectionData, [e.target.name]: e.target.value });
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
      setCollectionData({ ...collectionData, [e.target.name]: file });
    } else {
      setAlert('Please enter a valid image format', 'danger');
      const frm = document.getElementsByName('contact-form')[0];
      frm.reset();
    }
  };

  return (
    <div className='collections-form'>
      <h1 className='large text-primary'>Add a collection</h1>
      <form name='contact-form' className='form'>
        <div className='form-group'>
          <small className='form-text'>Collection name: </small>
          <input
            type='text'
            placeholder='Collection'
            name='name'
            value={collectionData.name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <small className='form-text'>Collection image: </small>
          <input
            type='file'
            name='imageUrl'
            accept='image/*'
            onChange={(e) => fileSelectHandler(e)}
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

const mapDispatchToProps = (dispatch) => ({
  addCollection: (collection) => dispatch(addCollection(collection)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(null, mapDispatchToProps)(AddCollectionsForm);
