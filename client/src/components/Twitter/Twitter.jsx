import React, { useEffect } from 'react';
import './Twitter.scss';

const Twitter = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://platform.twitter.com/widgets.js';
    script.className = 'custom-script';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='twitter'>
      <a
        className='twitter-timeline'
        data-height='500'
        data-chrome='nofooter'
        href='https://twitter.com/Atleti?ref_src=twsrc%5Etfw'
      >
        Tweets by Atleti
      </a>{' '}
    </div>
  );
};

export default Twitter;
