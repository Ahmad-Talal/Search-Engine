import {
    WEATHER_SEARCH_SUCCESS,
    WEATHER_SEARCH_FAIL,
} 
from '../constants/weatherConstants';
import axios from 'axios'

export const searchWeather = (loc) =>async (dispatch)=>{
    try{
	console.log(loc)
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: `${loc.lat},${loc.lng}`},
            headers: {
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
              'X-RapidAPI-Key': '5e23ea2a02msh8051364a9ff04a9p19837djsna24cd29ad377'
            }
          };
          
          axios.request(options).then(function (response) {
                dispatch({type:WEATHER_SEARCH_SUCCESS,payload:response.data})
                //console.log(response.data);
          }).catch(function (error) {
            dispatch({type:WEATHER_SEARCH_FAIL,
                payload:error.response && error.response.data.detail
                ?   error.response.data.detail 
                :   error.message,
            })
              //console.error(error);
          });
    }catch(error){
	    console.log(error);
    }
}
