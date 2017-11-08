import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import collections from './collections';
import books from './books';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    collections, books
})