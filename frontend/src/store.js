import { createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { allSearchReducer,imageSearchReducer,videoSearchReducer } from './reducers/searchReducers';
import { newsSearchReducer } from './reducers/newsReducers';
import { weatherSearchReducer } from './reducers/weatherReducers';
import { cacheSearchReducer } from './reducers/cacheReducers';

const reducer= combineReducers({
    allSearch:allSearchReducer,
    imageSearch:imageSearchReducer,
    videoSearch:videoSearchReducer,
    newsSearch:newsSearchReducer,
    weatherSearch:weatherSearchReducer,
    cacheSearch:cacheSearchReducer
});
const initialState = {
}


const middleware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;