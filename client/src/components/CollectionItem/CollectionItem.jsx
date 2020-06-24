import React from 'react';
import './CollectionItem.scss';
import CustomButton from '../CustomButton/CustomButton';
import LazyBackground from '../LazyBackground/LazyBackground';

import { connect } from 'react-redux';
import { addItem } from '../../Redux/cart/cart.actions';

const CollectionItem = ({ addItem, id, ...props }) => {
  const { imageUrl, name, price } = props;
  return (
    <div className='collection-item'>
      <LazyBackground source={imageUrl} cn={'image'} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{`$${price}`}</span>
      </div>
      <CustomButton inverted onClick={() => addItem({ id, ...props })}>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (disatch) => ({
  addItem: (item) => disatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
