import React from 'react';
import './Alert.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlerts } from '../../Redux/alert/alert.selectors';

const Alert = ({ alerts }) => (
  <div className='alert-container'>
    {alerts
      ? alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))
      : null}
  </div>
);

const mapStateToProps = createStructuredSelector({
  alerts: selectAlerts,
});

export default connect(mapStateToProps)(Alert);
