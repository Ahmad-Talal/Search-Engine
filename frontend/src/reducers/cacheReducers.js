import {
    CACHE_SEARCH_REQUEST,
    CACHE_SEARCH_SUCCESS,
    CACHE_SEARCH_FAIL,
} 
from '../constants/cacheConstants';

export const cacheSearchReducer= (state={loading:true,cache:[],error:""},action)=>{
switch(action.type){
case CACHE_SEARCH_REQUEST:
return {loading:true}

case CACHE_SEARCH_SUCCESS:
    return{loading:false,cache:action.payload}

case CACHE_SEARCH_FAIL:
    return{loading:false,error:action.payload}   
default:
    return state
}
}