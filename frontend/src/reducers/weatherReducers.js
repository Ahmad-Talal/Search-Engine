import {
    WEATHER_SEARCH_REQUEST,
    WEATHER_SEARCH_SUCCESS,
    WEATHER_SEARCH_FAIL,
} 
from '../constants/weatherConstants';

export const weatherSearchReducer= (state={loading:true,weather:{},error:""},action)=>{
switch(action.type){
case WEATHER_SEARCH_REQUEST:
return {loading:true}

case WEATHER_SEARCH_SUCCESS:
    return{loading:false,weather:action.payload}

case WEATHER_SEARCH_FAIL:
    return{loading:false,error:action.payload}   
default:
    return state
}
}