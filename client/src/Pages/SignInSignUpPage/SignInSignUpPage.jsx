import React, { useEffect } from 'react';
import './SignInSignUpPage.scss';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { loadUser, unsubscribe } from '../../Redux/user/user.actions';
import setAuthToken from '../../Redux/user/user.utils';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const SignInSignUpPage = ({ setNavbarMode, loadUser, match, unsubscribe }) => {
  useEffect(() => {
    loadUser();
    setNavbarMode('store');
    return () => unsubscribe();
  }, [setNavbarMode, loadUser, unsubscribe]);
  return (
    <div className='sign-in-sign-up'>
      <Route exact path={`${match.path}`} component={SignIn} />
      <Route exact path={`${match.path}/register`} component={Register} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
  loadUser: () => dispatch(loadUser()),
  unsubscribe: () => dispatch(unsubscribe()),
});

export default connect(null, mapDispatchToProps)(SignInSignUpPage);
