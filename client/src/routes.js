import * as React from 'react';
import { Route } from 'react-router-dom';
import  App  from './components/App';
import  BookCollectionsList  from './components/BookCollectionsList';
import  BookCollection  from './components/BookCollection';
import  BookList  from './components/BookList';

export const routes = <App>
    <Route exact  path='/collections' component={ BookCollectionsList }/>
    <Route exact  path='/collections/books/' component={ BookCollection }/>
    <Route exact  path='/books' component={ BookList }/>
</App>;