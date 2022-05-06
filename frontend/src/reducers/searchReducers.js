import {
    All_SEARCH_REQUEST,
    All_SEARCH_SUCCESS,
    All_SEARCH_FAIL,

    IMAGE_SEARCH_REQUEST,
    IMAGE_SEARCH_SUCCESS,
    IMAGE_SEARCH_FAIL,

    VIDEO_SEARCH_REQUEST,
    VIDEO_SEARCH_SUCCESS,
    VIDEO_SEARCH_FAIL,

   } 
from '../constants/searchConstants';

export const allSearchReducer= (state={loading:true,result:[],error:""},action)=>{
switch(action.type){
case All_SEARCH_REQUEST:
return {loading:true}

case All_SEARCH_SUCCESS:
    return{loading:false,result:action.payload}

case All_SEARCH_FAIL:
    return{loading:false,error:action.payload}   
default:
    return state

}
}

export const imageSearchReducer= (state={loading:true,image_result:[],error:""},action)=>{
    switch(action.type){
    case IMAGE_SEARCH_REQUEST:
    return {loading:true}
    
    case IMAGE_SEARCH_SUCCESS:
        return{loading:false,image_result:action.payload}
    
    case IMAGE_SEARCH_FAIL:
        return{loading:false,error:action.payload}   
    default:
        return state
}
}

export const videoSearchReducer= (state={loading:true,video_result:[],error:""},action)=>{
    switch(action.type){
    case VIDEO_SEARCH_REQUEST:
    return {loading:true}
    
    case VIDEO_SEARCH_SUCCESS:
        return{loading:false,video_result:action.payload}
    
    case VIDEO_SEARCH_FAIL:
        return{loading:false,error:action.payload}   
    default:
        return state
}
}