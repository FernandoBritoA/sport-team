import { youtubeActionTypes } from './youtube.actionTypes';

const INITIAL_STATE = {
  currentVideoId: null,
  youtubePreviews: null,
  isYoutubeFetching: false,
  youtubeErrorMessage: undefined,
};

const youtubeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case youtubeActionTypes.SET_CURRENT_VIDEO_ID:
      return {
        ...state,
        currentVideoId: payload,
      };
    case youtubeActionTypes.FETCH_YOUTUBE_START:
      return {
        ...state,
        isYoutubeFetching: true,
      };
    case youtubeActionTypes.FETCH_YOUTUBE_SUCCESS:
      return {
        ...state,
        isYoutubeFetching: false,
        youtubePreviews: payload,
      };
    case youtubeActionTypes.FETCH_YOUTUBE_FAILURE:
      return {
        ...state,
        isYoutubeFetching: false,
        youtubeErrorMessage: payload,
      };
    case youtubeActionTypes.FETCH_YOUTUBE_QUOTA_EXCEEDED:
      return {
        ...state,
        isYoutubeFetching: false,
        youtubePreviews: payload,
      };
    default:
      return state;
  }
};

export default youtubeReducer;
