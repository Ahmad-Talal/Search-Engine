import {
    NEWS_SEARCH_REQUEST,
    NEWS_SEARCH_SUCCESS,
    NEWS_SEARCH_FAIL,
} 
from '../constants/newsConstants';

export const newsSearchReducer= (state={loading:true,news:[],error:""},action)=>{
switch(action.type){
case NEWS_SEARCH_REQUEST:
return {loading:true}

case NEWS_SEARCH_SUCCESS:
    return{loading:false,news:action.payload}

case NEWS_SEARCH_FAIL:
    return{loading:false,error:action.payload}   
default:
    return state
}
}