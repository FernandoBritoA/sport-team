import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.scss';
import img1 from '../../images/carousel1.jpg';
import img2 from '../../images/carousel2.jpg';
import img3 from '../../images/carousel3.jpg';
import img4 from '../../images/carousel4.jpg';

import LazyBackground from '../LazyBackground/LazyBackground';

const ImageCarousel = () => {
  const originalArray = [
    {
      image: img1,
      display: 'none',
      active: null,
      animation: null,
    },
    { image: img2, display: 'none', active: null, animation: null },
    { image: img3, display: 'none', active: null, animation: null },
    { image: img4, display: 'none', active: null, animation: null },
  ];

  const [imageIndex, setImageIndex] = useState(originalArray.length - 1);
  const [imgArray, setImgArray] = useState(originalArray);

  const indexRef = useRef(imageIndex);
  indexRef.current = imageIndex;

  const intervalRef = useRef(null);

  useEffect(() => {
    nextImage();
    intervalRef.current = setInterval(nextImage, 3000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextImage = () => {
    let i = indexRef.current;
    if (i === originalArray.length - 1) {
      i = 0;
    } else {
      i = i + 1;
    }
    modifyArray(i, 'toRight');
    setImageIndex(i);
  };

  const previousImage = () => {
    let i = indexRef.current;
    if (i === 0) {
      i = originalArray.length - 1;
    } else {
      i = i - 1;
    }
    modifyArray(i, 'toLeft');
    setImageIndex(i);
  };

  const modifyArray = (i, direction) => {
    const newArray = [...originalArray];
    newArray[i].display = 'block';
    newArray[i].active = 'active';

    switch (direction) {
      case 'toRight':
        newArray[i].animation = 'animate__fadeInLeft';
        newArray[indexRef.current].display = 'block';
        newArray[indexRef.current].animation = 'animate__fadeOutRight';
        break;
      case 'toLeft':
        newArray[i].animation = 'animate__fadeInRight';
        newArray[indexRef.current].display = 'block';
        newArray[indexRef.current].animation = 'animate__fadeOutLeft';
        break;
      default:
        break;
    }
    setImgArray(newArray);
  };

  return (
    <div className='image-carousel-container'>
      <div className='image-carousel'>
        {imgArray.map(({ image, display, animation }, i) => (
          <div
            key={i}
            className={`slide animate__animated ${animation} `}
            style={{ display: display }}
          >
            <LazyBackground source={image} cn={'carr-background-image'} />
          </div>
        ))}

        <button
          className='prev'
          onClick={() => {
            clearInterval(intervalRef.current);
            previousImage();
          }}
        >
          &#10094;
        </button>
        <button
          className='next'
          onClick={() => {
            clearInterval(intervalRef.current);
            nextImage();
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
