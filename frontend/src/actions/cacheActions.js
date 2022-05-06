import {
    CACHE_SEARCH_SUCCESS,
    CACHE_SEARCH_FAIL,
} 
from '../constants/cacheConstants';
import axios from 'axios'

export const searchCache = (user) =>async (dispatch)=>{
    try{
        const {data} =await axios.get(
            `http://ec2-3-144-183-187.us-east-2.compute.amazonaws.com/api/search/get/${user}/`
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
