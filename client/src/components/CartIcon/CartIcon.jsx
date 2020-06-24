import React from 'react';
import './CartIcon.scss';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../Redux/cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../Redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, cartItemsCount }) => {
  return (
    <div className='cart-icon' onClick={() => toggleCartHidden()}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
