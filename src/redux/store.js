import {  createStore } from 'redux';
import scrollStateReducer from './reducers';

const store = createStore(scrollStateReducer);

export default store;
