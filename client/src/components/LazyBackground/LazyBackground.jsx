import React from 'react';
import useProgressiveImage from '../../hooks/useProgressiveImage';
import WithSpinner from '../WithSpinner/WithSpinner';

const LazyBackgroundWithSpinner = WithSpinner(<div />);

const LazyBackground = ({ source, cn }) => {
  const loaded = useProgressiveImage(source);

  const isLoaded = !!loaded;

  return isLoaded ? (
    <div
      className={cn}
      style={{
        backgroundImage: `url(${loaded})`,
      }}
    />
  ) : (
    <LazyBackgroundWithSpinner isLoading={true} />
  );
};

export default LazyBackground;
