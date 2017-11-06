import * as React from 'react';
import { Route } from 'react-router-dom';
import  App  from './components/App';
import  BookCollectionsList  from './components/BookCollectionsList';
import  BookCollection  from './components/BookCollection';

export const routes = <App>
    <Route exact  path='/collections' component={ BookCollectionsList }/>
    <Route exact  path='/collection/view/' component={ BookCollection }/>
</App>;