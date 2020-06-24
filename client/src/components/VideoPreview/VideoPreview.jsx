import React from 'react';
import './VideoPreview.scss';

import { connect } from 'react-redux';
import { setCurrentVideoId } from '../../Redux/youtube/youtube.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentVideoId } from '../../Redux/youtube/youtube.selectors';

const VideoPreview = ({
  videoId,
  previewUrl,
  title,
  currentVideoId,
  setCurrentVideoId,
}) => {
  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  const decodedTitle = decodeHTMLEntities(title);
  return currentVideoId !== videoId ? (
    <div className='video-preview-container'>
      <div className='video-preview' onClick={() => setCurrentVideoId(videoId)}>
        <img className='image-preview' src={previewUrl} alt='' />
        <i className='fa fa-play-circle play-button' />
      </div>
      <div className='video-title'>{decodedTitle}</div>
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  currentVideoId: selectCurrentVideoId,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentVideoId: (videoId) => dispatch(setCurrentVideoId(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview);
