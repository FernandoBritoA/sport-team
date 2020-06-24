import React, { useState } from 'react';
import './SignIn.scss';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { signInUser } from '../../Redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from '../../Redux/user/user.selectors';

const SignIn = ({ signInUser, isAuthenticated, match }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    signInUser({ email, password });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  if (isAuthenticated) {
    return <Redirect to='/store' />;
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>Sign In</h2>
      <span className='subtitle'>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='password'
          required
        />

        <CustomButton type='submit' inverted={false}>
          Sign In
        </CustomButton>
        <p className='register-footer'>
          Don't have an account yet?{` `}
          <Link to={`${match.path}/register`}>
            <span className='register-link'>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (user) => dispatch(signInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
