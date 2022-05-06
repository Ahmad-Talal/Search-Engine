import {
    NEWS_SEARCH_SUCCESS,
    NEWS_SEARCH_FAIL,
} 
from '../constants/newsConstants';
import axios from 'axios'

export const searchNews = () =>async (dispatch)=>{
    try{
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI',
            params: {pageNumber: '1', pageSize: '10', withThumbnails: 'false'},
            headers: {
              'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '5e23ea2a02msh8051364a9ff04a9p19837djsna24cd29ad377'
            }
          };
          
          axios.request(options).then(function (response) {
            dispatch({type:NEWS_SEARCH_SUCCESS,payload:response.data})
              //console.log(response.data);
          }).catch(function (error) {
            dispatch({type:NEWS_SEARCH_FAIL,
                payload:error.response && error.response.data.detail
                ?   error.response.data.detail 
                :   error.message,
            })
              //console.error(error);
          });
    }catch(error){
    }   
}
