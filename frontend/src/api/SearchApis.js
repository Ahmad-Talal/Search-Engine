
import axios from 'axios'
import {
    All_SEARCH_SUCCESS,
    All_SEARCH_FAIL,
} 
from '../constants/searchConstants';

const simpleSearch=(t)=>async(dispatch)=>{
    console.log("in")
    const options = {
        method: 'GET',
        url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${t}`,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'EU',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
          'X-RapidAPI-Key': 'b18ef3795dmsh2f4b09ac59f6970p15397ejsnb55f5c50a301'
        }
      };
      console.log("waste        ",t)
      axios.request(options).then(function (response) {
          console.log(response.data,"here");
          dispatch({type:All_SEARCH_SUCCESS,payload:response.data})
      }).catch(function (error) {
          
        dispatch({type:All_SEARCH_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,
        })
          console.error(error);
          return []
      });

     
 }
 export default simpleSearch;
