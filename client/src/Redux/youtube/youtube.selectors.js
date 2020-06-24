import { createSelector } from 'reselect';

const selectYoutubeData = (state) => state.youtube;

export const selectIsYoutubeFetching = createSelector(
  [selectYoutubeData],
  (youtubeData) => youtubeData.isYoutubeFetching
);

export const selectYoutubePreviews = createSelector(
  [selectYoutubeData],
  (youtubeData) => youtubeData.youtubePreviews
);

export const selectCurrentVideoId = createSelector(
  [selectYoutubeData],
  (youtubeData) => youtubeData.currentVideoId
);

export const selectArePreviewsLoaded = createSelector(
  [selectYoutubeData],
  (youtubeData) => !!youtubeData.youtubePreviews
); //!! convert to boolean value
