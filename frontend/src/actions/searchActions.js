import {
    All_SEARCH_SUCCESS,
    All_SEARCH_FAIL,

    
    IMAGE_SEARCH_SUCCESS,
    IMAGE_SEARCH_FAIL,

    VIDEO_SEARCH_SUCCESS,
    VIDEO_SEARCH_FAIL,
} 
from '../constants/searchConstants';
import axios from 'axios'

export const searchAll = (term) =>async (dispatch)=>{
    try{
        
        const options = {
            method: 'GET',
            url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${term}`,
            headers: {
              'X-User-Agent': 'desktop',
              'X-Proxy-Location': 'EU',
              'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
              'X-RapidAPI-Key': '5e23ea2a02msh8051364a9ff04a9p19837djsna24cd29ad377'
            }
          };
          axios.request(options).then(function (response) {
              
              dispatch({type:All_SEARCH_SUCCESS,payload:response.data})
              //console.log(response.data);
          }).catch(function (error) {
              
            dispatch({type:All_SEARCH_FAIL,
                payload:error.response && error.response.data.detail
                ?   error.response.data.detail 
                :   error.message,
            })
              //console.error(error);
          });
    }catch(error){
    }   
}

export const searchImage = (term) =>async (dispatch)=>{
    try{
        
        const options = {
            method: 'GET',
            url: `https://google-search3.p.rapidapi.com/api/v1/image/q=${term}`,
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '5e23ea2a02msh8051364a9ff04a9p19837djsna24cd29ad377'
              }
            };
          axios.request(options).then(function (response) {
              
              dispatch({type:IMAGE_SEARCH_SUCCESS,payload:response.data})
              //console.log(response.data);
          }).catch(function (error) {
              
            dispatch({type:IMAGE_SEARCH_FAIL,
                payload:error.response && error.response.data.detail
                ?   error.response.data.detail 
                :   error.message,
            })
              console.error(error);
          });
    }catch(error){
    }
}

export const searchVideo = (term) =>async (dispatch)=>{
    try{
        
        const options = {
            method: 'GET',
            url: `https://google-search3.p.rapidapi.com/api/v1/video/q=${term}`,
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '5e23ea2a02msh8051364a9ff04a9p19837djsna24cd29ad377'
              }
            };
          axios.request(options).then(function (response) {
              
              dispatch({type:VIDEO_SEARCH_SUCCESS,payload:response.data})
              //console.log(response.data);
          }).catch(function (error) {
              
            dispatch({type:VIDEO_SEARCH_FAIL,
                payload:error.response && error.response.data.detail
                ?   error.response.data.detail 
                :   error.message,
            })
              console.error(error);
          });
    }catch(error){
    }   
}
