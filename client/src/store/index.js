import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(history, initialState) {
    const enhancers = [];
    const middleware = [ thunk, routerMiddleware(history) ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = window.devToolsExtension

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware),
        ...enhancers
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer, initialState)

    return  store
}