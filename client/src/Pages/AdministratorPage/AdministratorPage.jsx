import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import WithSpinner from '../../components/WithSpinner/WithSpinner';
import AdministratorForms from '../../components/AdministratorForms/AdministratorForms';
import { connect } from 'react-redux';
import { fetchStoreData } from '../../Redux/storeData/storeData.actions';
import { unsubscribe } from '../../Redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { isFetchingCollections } from '../../Redux/storeData/storeData.selectors';
import { selectIsAdmin } from '../../Redux/user/user.selectors';

const AdministratorFormsWithSpinner = WithSpinner(AdministratorForms);

const AdministratorPage = ({
  match,
  fetchStoreData,
  isFetchingCollections,
  isAdmin,
  unsubscribe,
}) => {
  useEffect(() => {
    fetchStoreData();

    return () => unsubscribe();
  }, [fetchStoreData, unsubscribe]);

  if (!isAdmin) {
    return <Redirect to='/store' />;
  }

  return (
    <div>
      <Route
        exact
        path={`${match.path}/`}
        render={(props) => (
          <AdministratorFormsWithSpinner
            isLoading={isFetchingCollections}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: isFetchingCollections,
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStoreData: () => dispatch(fetchStoreData()),
  unsubscribe: () => dispatch(unsubscribe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorPage);
