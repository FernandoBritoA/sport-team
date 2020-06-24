import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import WithSpinner from '../../components/WithSpinner/WithSpinner';
import Directory from '../../components/Directory/Directory';
import CollectionPage from '../CollectionPage/CollectionPage.jsx';

import { connect } from 'react-redux';
import { fetchStoreData } from '../../Redux/storeData/storeData.actions';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { loadUser, unsubscribe } from '../../Redux/user/user.actions';
import setAuthToken from '../../Redux/user/user.utils';

import { createStructuredSelector } from 'reselect';
import { areCollectionsLoaded } from '../../Redux/storeData/storeData.selectors';

const DirectoryWithSpinner = WithSpinner(Directory);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const StorePage = ({
  match,
  fetchStoreData,
  areCollectionsLoaded,
  setNavbarMode,
  loadUser,
  unsubscribe,
}) => {
  useEffect(() => {
    setNavbarMode('store');
    loadUser();
    if (!areCollectionsLoaded) {
      fetchStoreData();
    }
    return () => unsubscribe();
  }, [
    fetchStoreData,
    areCollectionsLoaded,
    setNavbarMode,
    loadUser,
    unsubscribe,
  ]);
  return (
    <div>
      <Route
        exact
        path={`${match.path}/`}
        render={(props) => (
          <DirectoryWithSpinner isLoading={!areCollectionsLoaded} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!areCollectionsLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  areCollectionsLoaded: areCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStoreData: () => dispatch(fetchStoreData()),
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
  loadUser: () => dispatch(loadUser()),
  unsubscribe: () => dispatch(unsubscribe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
