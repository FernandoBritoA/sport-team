import React from 'react';
import './Subcollection.scss';
import CollectionItem from '../CollectionItem/CollectionItem';

const Subcollection = ({ ...props }) => {
  const { name, items } = props;
  return (
    <div className='subcollection-container'>
      <h1 className='subcollection-title'>{name}</h1>
      <div className='subcollection-items'>
        {items.map(({ _id, ...props }) => (
          <CollectionItem key={_id} id={_id} {...props} />
        ))}
      </div>
    </div>
  );
};

export default Subcollection;
