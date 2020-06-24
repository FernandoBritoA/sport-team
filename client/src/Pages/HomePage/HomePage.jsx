import React, { useEffect } from 'react';
import './HomePage.scss';
import YouTube from '../../components/YouTube/YouTube';
import Twitter from '../../components/Twitter/Twitter';
import LastResults from '../../components/LastResults/LastResults';
import HomePageContainer from './HomePageContainer';
import WithSpinner from '../../components/WithSpinner/WithSpinner';

import { connect } from 'react-redux';
import {
  fetchLastResults,
  fetchPDStandings,
  fetchCLStandings,
} from '../../Redux/footballData/footballData.actions';
import {
  setCurrentVideoId,
  fetchYoutube,
} from '../../Redux/youtube/youtube.actions';
import { setNavbarMode } from '../../Redux/navbarMode/navbarMode.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectIsLastResultsLoaded,
  selectIsPDStandingsLoaded,
  selectIsCLStandingsLoaded,
  selectAreStandingsFetching,
} from '../../Redux/footballData/footballData.selectors';
import {
  selectArePreviewsLoaded,
  selectYoutubePreviews,
  selectIsYoutubeFetching,
} from '../../Redux/youtube/youtube.selectors';

const HomePageContainerWithSpinner = WithSpinner(HomePageContainer);

const HomePage = ({
  fetchLastResults,
  isLastResultsLoaded,
  fetchPDStandings,
  isPDStandingsLoaded,
  fetchCLStandings,
  isCLStandingsLoaded,
  fetchYoutube,
  setCurrentVideoId,
  youtubePreviews,
  arePreviewsLoaded,
  isYoutubeFetching,
  setNavbarMode,
}) => {
  useEffect(() => {
    setNavbarMode('default');
    //FOOTBALL DATA //
    const getNextMonthDates = () => {
      const today = new Date();
      const nextMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
      );
      return nextMonth.toISOString().slice(0, 10);
    };
    if (!isPDStandingsLoaded) {
      fetchPDStandings();
    }
    if (!isCLStandingsLoaded) {
      fetchCLStandings();
    }
    if (!isLastResultsLoaded) {
      if (isPDStandingsLoaded && isCLStandingsLoaded)
        fetchLastResults(getNextMonthDates());
    }
    //YOUTUBE//

    if (!isYoutubeFetching) {
      if (!arePreviewsLoaded) {
        fetchYoutube();
      }
    }
    if (arePreviewsLoaded) {
      setCurrentVideoId(youtubePreviews[0].videoId);
    }
  }, [
    fetchLastResults,
    isLastResultsLoaded,
    fetchPDStandings,
    fetchCLStandings,
    isCLStandingsLoaded,
    isPDStandingsLoaded,
    fetchYoutube,
    setCurrentVideoId,
    arePreviewsLoaded,
    youtubePreviews,
    isYoutubeFetching,
    setNavbarMode,
  ]);
  console.log('hey');
  return isLastResultsLoaded && arePreviewsLoaded ? (
    <div className='homepage'>
      <LastResults />
      <div className='social-media'>
        <YouTube />
        <Twitter />
      </div>
    </div>
  ) : (
    <HomePageContainerWithSpinner isLoading={true} />
  );
};

const MapStateToProps = createStructuredSelector({
  isLastResultsLoaded: selectIsLastResultsLoaded,
  isPDStandingsLoaded: selectIsPDStandingsLoaded,
  isCLStandingsLoaded: selectIsCLStandingsLoaded,
  areStandingsFetching: selectAreStandingsFetching,
  arePreviewsLoaded: selectArePreviewsLoaded,
  youtubePreviews: selectYoutubePreviews,
  isYoutubeFetching: selectIsYoutubeFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLastResults: (nextMonthDates) =>
    dispatch(fetchLastResults(nextMonthDates)),
  fetchPDStandings: () => dispatch(fetchPDStandings()),
  fetchCLStandings: () => dispatch(fetchCLStandings()),
  fetchYoutube: () => dispatch(fetchYoutube()),
  setCurrentVideoId: (videoId) => dispatch(setCurrentVideoId(videoId)),
  setNavbarMode: (mode) => dispatch(setNavbarMode(mode)),
});

export default connect(MapStateToProps, mapDispatchToProps)(HomePage);
