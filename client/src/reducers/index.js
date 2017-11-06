import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import collections from './collections';
import books from './books';

export default combineReducers({
    routing: routerReducer,
    collections, books
})