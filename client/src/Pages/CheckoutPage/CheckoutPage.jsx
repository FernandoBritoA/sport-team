import React, { useEffect } from 'react';
import './CheckoutPage.scss';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';

import { connect } from 'react-redux';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { loadUser, unsubscribe } from '../../Redux/user/user.actions';
import setAuthToken from '../../Redux/user/user.utils';

import { createStructuredSelector } from 'reselect';
import {
  selectCartItems,
  selectCartTotal,
} from '../../Redux/cart/cart.selectors';

import StripeCheckoutButton from '../../components/StripeCheckoutButton/StripeCheckoutButton';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const CheckoutPage = ({
  cartItems,
  total,
  setNavbarMode,
  loadUser,
  unsubscribe,
}) => {
  useEffect(() => {
    loadUser();
    setNavbarMode('store');

    return () => unsubscribe();
  }, [setNavbarMode, loadUser, unsubscribe]);
  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block description'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <div className='total'>
        <span>Total: ${total}</span>
      </div>
      <div className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 12/20 - CVV: 123
      </div>
      <StripeCheckoutButton price={total} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapDispatchToProps = (dispatch) => ({
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
  loadUser: () => dispatch(loadUser()),
  unsubscribe: () => dispatch(unsubscribe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
