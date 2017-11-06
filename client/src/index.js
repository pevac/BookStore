import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import  { routes } from './routes';
import configureStore from './store';


const history = createBrowserHistory({ basename: '/' });
const store = configureStore(history, {});

ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={ history } children={routes}  />
        </Provider>
    , 
    document.getElementById('root')
);

registerServiceWorker();
