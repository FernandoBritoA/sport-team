import { youtubeActionTypes } from './youtube.actionTypes';
import resJsonBackUp from './youtube-api-response';
import axios from 'axios';

//* Set Current Video ID
export const setCurrentVideoId = (videoId) => ({
  type: youtubeActionTypes.SET_CURRENT_VIDEO_ID,
  payload: videoId,
});

//* FetchYoutube
const fetchYoutubeStart = () => ({
  type: youtubeActionTypes.FETCH_YOUTUBE_START,
});

const fetchYoutubeSuccess = (results) => ({
  type: youtubeActionTypes.FETCH_YOUTUBE_SUCCESS,
  payload: results,
});

/*const fetchYoutubeFailure = (errorMessage) => ({
  type: youtubeActionTypes.FETCH_YOUTUBE_FAILURE,
  payload: errorMessage,
});*/

const youtubeQuotaExceededBackUp = (backUp) => ({
  type: youtubeActionTypes.FETCH_YOUTUBE_QUOTA_EXCEEDED,
  payload: backUp,
});

export const fetchYoutube = () => {
  return async (dispatch) => {
    dispatch(fetchYoutubeStart());

    const channelId = 'UCuzKFwdh7z2GHcIOX_tXgxA';
    const key = 'AIzaSyAKF-P44IZuxDrocXarAxeZEABWwdl-Y9Q';
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`
      );
      const data = await response.data;

      const previews = data.items.map((item) => {
        return {
          videoId: item.id.videoId,
          previewUrl: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
        };
      });
      dispatch(fetchYoutubeSuccess(previews));
    } catch (error) {
      console.log(error);
      const previews = resJsonBackUp.items.map((item) => {
        return {
          videoId: item.id.videoId,
          previewUrl: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
        };
      });
      return dispatch(youtubeQuotaExceededBackUp(previews));
    }
  };
};
