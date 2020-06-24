import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import youtube from './youtube/youtube.reducer';
import footballData from './footballData/footballData.reducer';
import teamData from './teamData/teamData.reducer';
import storeData from './storeData/storeData.reducer';
import alerts from './alert/alert.reducer';
import cart from './cart/cart.reducer';
import navbarMode from './navbarMode/navbarMode.reducer';
import user from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  youtube,
  footballData,
  teamData,
  storeData,
  alerts,
  cart,
  navbarMode,
  user,
});

export default persistReducer(persistConfig, rootReducer);
//export default rootReducer;
