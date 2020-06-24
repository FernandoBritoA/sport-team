import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import './Register.scss';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../Redux/alert/alert.actions';
import { registerUser } from '../../Redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from '../../Redux/user/user.selectors';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert('Passwords dont match', 'danger');
    } else {
      //console.log({ name, email, password });
      registerUser({ name, email, password });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  if (isAuthenticated) {
    return <Redirect to='/store' />;
  }

  return (
    <div className='register'>
      <h2 className='title'>Register</h2>
      <span className='subtitle'>Register with your credentials</span>
      <form className='register-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={name}
          handleChange={handleChange}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton inverted={false} type='submit'>
          REGISTER
        </CustomButton>

        <p className='signin-footer'>
          Already have an account?{` `}
          <Link to={`/signin`}>
            <span className='signin-link'>Sign In</span>
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
  registerUser: (userData) => dispatch(registerUser(userData)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
