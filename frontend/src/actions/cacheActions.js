import {
    CACHE_SEARCH_SUCCESS,
    CACHE_SEARCH_FAIL,
} 
from '../constants/cacheConstants';
import axios from 'axios'

export const searchCache = (user) =>async (dispatch)=>{
    try{
        const {data} =await axios.get(
            `http://127.0.0.1:8000/api/search/get/${user}/`
            )
        dispatch({
                  type:CACHE_SEARCH_SUCCESS,
                  payload:data
                })
    }catch(error){
        dispatch({type:CACHE_SEARCH_FAIL,
            payload:error.response && error.response.data.detail
            ?   error.response.data.detail 
            :   error.message,  
        })
    }   
}
