import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

const initialState = {
    ...window.__INITIAL_STATE__,
    isLoading: false,
    isArticleNavOpen: false,
    isPushMenuOpen: false
};

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
