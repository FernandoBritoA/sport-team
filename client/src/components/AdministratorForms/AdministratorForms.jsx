import React from 'react';
import './AdministratorForms.scss';
import AddCollectionsForm from './AddCollectionsForm';
import AddSubcollectionsForm from './AddSubcollectionsForm';
import AddItemsForm from './AddItemsForm';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { areCollectionsLoaded } from '../../Redux/storeData/storeData.selectors';

const AdministratorForms = ({ areCollectionsLoaded }) =>
  areCollectionsLoaded ? (
    <div className='administrator-forms'>
      <AddCollectionsForm />
      <AddSubcollectionsForm />
      <AddItemsForm />
    </div>
  ) : null;

const mapStateToProps = createStructuredSelector({
  areCollectionsLoaded: areCollectionsLoaded,
});

export default connect(mapStateToProps)(AdministratorForms);
