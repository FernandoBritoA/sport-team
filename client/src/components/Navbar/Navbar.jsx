import React, { Fragment } from 'react';
import './Navbar.scss';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';

import { connect } from 'react-redux';
import { signOut } from '../../Redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../Redux/cart/cart.selectors';
import { selectNavbarMode } from '../../Redux/navbarMode/navbarMode.selectors';
import {
  selectIsAuthenticated,
  selectIsLoading,
} from '../../Redux/user/user.selectors';

const Navbar = ({
  cartHidden,
  navbarMode,
  signOut,
  isAuthenticated,
  isLoading,
}) => {
  return (
    <div className='navbar'>
      <Link to='/' className='logoname'>
        <img className='logo' src={logo} alt='logo' />
        <h1 className='teamname'>Atlético de Madrid</h1>
      </Link>
      {navbarMode.default ? (
        <div className='options'>
          <Link to='/team' className='option'>
            <h2>Team</h2>
          </Link>
          <Link to='/stats/liga' className='option'>
            <h2>Stats</h2>
          </Link>
          <Link to='/store' className='option'>
            <h2>Store</h2>
          </Link>
        </div>
      ) : navbarMode.store ? (
        <div className='options'>
          {!isLoading && (
            <Fragment>
              {isAuthenticated ? (
                <div className='option ' onClick={signOut}>
                  <h2>Sign Out</h2>
                </div>
              ) : (
                <Link to='/signin' className='option '>
                  <h2>Sign In</h2>
                </Link>
              )}
            </Fragment>
          )}

          <Link to='/store' className='option adjust-margin'>
            <h2>Store</h2>
          </Link>
          <CartIcon />
          {cartHidden ? null : <CartDropdown />}
        </div>
      ) : navbarMode.admin ? (
        <div className='options'>
          {!isLoading && (
            <Fragment>
              {isAuthenticated ? (
                <div className='option ' onClick={signOut}>
                  <h2>Sign Out</h2>
                </div>
              ) : (
                <Link to='/signin' className='option '>
                  <h2>Sign In</h2>
                </Link>
              )}
            </Fragment>
          )}

          <Link to='/admin' className='option'>
            <h2>Admin</h2>
          </Link>

          <Link to='/store' className='option'>
            <h2>Store</h2>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartHidden: selectCartHidden,
  navbarMode: selectNavbarMode,
  isLoading: selectIsLoading,
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
