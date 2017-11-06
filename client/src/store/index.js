import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import rootSaga from '../sagas';


export default function configureStore(history, initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const enhancers = [];
    const middleware = [ sagaMiddleware, routerMiddleware(history) ];

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

    if (module.hot) {
        module.hot.accept('../reducers', () => {
          const nextRootReducer = require('../reducers').default
          store.replaceReducer(nextRootReducer)
        })
    }

    sagaMiddleware.run(rootSaga);
    store.close = () => store.dispatch(END)

    return  store
}