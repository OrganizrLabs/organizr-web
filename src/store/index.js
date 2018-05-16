// @flow
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

// reducer imports
import { appReducer } from './app';
import { userReducer } from './user';

const reducers = combineReducers({
  app: appReducer,
  user: userReducer,
  firebase: firebaseReducer
});

const persistConfig = {
  key: 'app',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

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
export const store = createStoreWithFirebase(
  persistedReducer,
  applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Persister for the store
export const persistor = persistStore(store);
