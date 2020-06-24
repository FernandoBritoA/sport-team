import { createSelector } from 'reselect';

const selectStoreData = (state) => state.storeData;

export const selectCollections = createSelector(
  [selectStoreData],
  (storeData) =>
    storeData.collections
      ? storeData.collections.map((collection) => collection)
      : null
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) => {
    switch (collectionUrlParam) {
      case 'mens':
        collectionUrlParam = '5ed5e3d786c4782654924542';
        break;
      case 'kids':
        collectionUrlParam = '5ed5e40886c4782654924543';
        break;
      case 'womens':
        collectionUrlParam = '5ed5e42a86c4782654924544';
        break;
      default:
        break;
    }
    return collections
      ? collections.find((collection) => collection._id === collectionUrlParam)
      : null;
  });

export const isFetchingCollections = createSelector(
  [selectStoreData],
  (storeData) => storeData.isStoreDataFetching
);

export const areCollectionsLoaded = createSelector(
  [selectStoreData],
  (storeData) => !!storeData.collections
);
