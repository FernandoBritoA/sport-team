import React from 'react';
import './YouTube.scss';
import VideoPreview from '../VideoPreview/VideoPreview';

import { createStructuredSelector } from 'reselect';
import {
  selectCurrentVideoId,
  selectYoutubePreviews,
} from '../../Redux/youtube/youtube.selectors';
import { connect } from 'react-redux';

const YouTube = ({ youtubePreviews, currentVideoId }) => {
  return (
    <div className='youtube-container'>
      <iframe
        className='video-player'
        title='game'
        src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&vq=hd720`}
        frameBorder='0'
        allowFullScreen
        allow='autoplay; fullscreen'
      ></iframe>
      <div className='video-previews'>
        {youtubePreviews.map(({ videoId, previewUrl, title }) => (
          <VideoPreview
            key={videoId}
            videoId={videoId}
            previewUrl={previewUrl}
            title={title}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  youtubePreviews: selectYoutubePreviews,
  currentVideoId: selectCurrentVideoId,
});

export default connect(mapStateToProps)(YouTube);
