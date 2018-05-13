// @flow
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import logger from 'redux-logger';

// reducer imports
import { appReducer } from './app';
import { userReducer } from './user';

const reducers = combineReducers({
  app: appReducer,
  user: userReducer,
  firebase: firebaseReducer
});

// Initialize firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAc-4bTPcTqKLUAALmxLUlepSD1V_9q8Bg',
  authDomain: 'organizr-66bde.firebaseapp.com',
  databaseURL: 'https://organizr-66bde.firebaseio.com',
  projectId: 'organizr-66bde',
  storageBucket: '',
  messagingSenderId: '120616248695'
});

// Set configuration for react-redux-firebase
const rrfConfig = {
  userProfile: 'users'
};

// Enhanced createStore which allows firebase changes to be watched
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore);

// Creating the store
const store = createStoreWithFirebase(
  reducers,
  applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
