import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { connect } from 'react-redux';
import { setAlert } from '../../Redux/alert/alert.actions';
import { clearOutCart } from '../../Redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, setAlert, clearOutCart }) => {
  const priceForStripe = price * 100; //stripe needs value in cents
  const publishableKey = 'pk_test_A2GWROQjhUwoWxiOus4gvgdP00chn8Yp8h';
  const onToken = (token) => {
    clearOutCart();
    setAlert('Payment Succesful', 'success', 3000);
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Atleti Store'
      billingAddress
      shippingAddress
      image='https://i.ibb.co/FX2jbfQ/atleti-logo.png'
      description={`Your total is is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: (msg, type, time) => dispatch(setAlert(msg, type, time)),
  clearOutCart: () => dispatch(clearOutCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
