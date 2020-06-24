//import adminStoreActionTypes from './adminStore.actionTypes';
import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { fetchStoreData } from '../storeData/storeData.actions';

export const addCollection = (collection) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const imgbbKey = 'fd3970d1ff34f8cda4d8b2330f798ab8';
    try {
      const file = collection.imageUrl;
      const fileName = file.name;
      const idxDot = fileName.lastIndexOf('.');
      const extFreeName = fileName.substr(0, idxDot).toLowerCase();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const encoded = await reader.result
          .toString()
          .replace(/^data:(.*,)?/, '');

        const bodyFormData = new FormData();
        bodyFormData.append('image', encoded);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}&name=${extFreeName}`,
          bodyFormData
        );
        collection.imageUrl = response.data.data.url;

        await axios.post(
          'https://pacific-retreat-49876.herokuapp.com/api/collections',
          collection,
          config
        );
        await dispatch(fetchStoreData());
        dispatch(setAlert('Collection Added', 'success'));
      };
    } catch (error) {
      const errorsArray = error.response.data.errors;

      if (errorsArray) {
        errorsArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  };
};

export const addSubcollection = (subcollection, collectionId) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post(
        `https://pacific-retreat-49876.herokuapp.com/api/collections/${collectionId}`,
        subcollection,
        config
      );
      await dispatch(fetchStoreData());
      await dispatch(setAlert('Subcollection Added', 'success'));
    } catch (error) {
      const errorsArray = error.response.data.errors;

      if (errorsArray) {
        errorsArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  };
};

export const addItem = (item, collectionId, subcollectionId) => {
  return async (dispatch) => {
    const priceToNum = parseInt(item.price);
    item.price = priceToNum;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const imgbbKey = 'fd3970d1ff34f8cda4d8b2330f798ab8';
    try {
      const file = item.imageUrl;
      const fileName = file.name;
      const idxDot = fileName.lastIndexOf('.');
      const extFreeName = fileName.substr(0, idxDot).toLowerCase();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const encoded = await reader.result
          .toString()
          .replace(/^data:(.*,)?/, '');

        const bodyFormData = new FormData();
        bodyFormData.append('image', encoded);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}&name=${extFreeName}`,
          bodyFormData
        );
        item.imageUrl = response.data.data.url;

        await axios.post(
          `https://pacific-retreat-49876.herokuapp.com/api/collections/${collectionId}/${subcollectionId}`,
          item,
          config
        );
        await dispatch(fetchStoreData());
        dispatch(setAlert('Item Added', 'success'));
      };
    } catch (error) {
      const errorsArray = error.response.data.errors;

      if (errorsArray) {
        errorsArray.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  };
};
