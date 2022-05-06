import React, {useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Loader from '../components/Loader';
import Message from '../components/Message';

import {searchWeather} from '../actions/weatherActions'
import useGeoLocation from '../hooks/useGeoLocation';


import {
    WEATHER_SEARCH_REQUEST,
  } from "../constants/weatherConstants";

const Weather=({history})=> {
    const dispatch=useDispatch()   
    const location = useGeoLocation();
    const weatherSearch = useSelector(state=>state.weatherSearch)
    const {loading,weather,error} = weatherSearch
    useEffect(() => {
        if(location.loaded){    
        if (loading){ 
            dispatch(searchWeather(location.coordinates))
        } 
        }
    }, [history,weather,loading,error,dispatch,location])

    const refresh = () => {    
        dispatch({type:WEATHER_SEARCH_REQUEST})
    }
    
  return (
  <div> 
  <br></br>
  <br></br>
  {loading ? <Loader/> :
  
      error ? <Message variant='dark'>{error}</Message>:
  (
  <div>
<h2 style={{color:"blue"}}>Weather Report</h2>
<Container sx={{ py: 8 }} maxWidth="lg">
    <Grid container spacing={12}>
        <Grid item xs={12} sm={6} md={12}>
            <Card
                style = {{padding: "2rem 0rem"}}
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {weather.current.temp_c}{"°C"} 
                    </Typography> 
                    <Typography style={{color:"blue"}}>
                        {weather.current.condition.text} {" "}
                    </Typography>
                    <Typography style={{color:"blue"}}>
                        last updated{"  "}{weather.current.last_updated}
                    </Typography>
                    <Typography style={{color:"blue"}}>
                        Local Time{"  "}{weather.location.localtime}
                    </Typography>
                    <Typography style={{color:"blue"}}>
                        {weather.location.name}{"   "}{weather.location.region}{" "}{weather.location.country}
                    </Typography>
                </CardContent>

                
                <CardMedia
                component="img"
                image = {`${weather.current.condition.icon}`}
                alt   =   ""
                />

                <CardActions>  
                    <Button onClick={refresh} size="small">Refresh</Button>
                  </CardActions>
            </Card>
        </Grid>
    </Grid>
</Container>

</div>
)
}
</div>
);
}

export default Weather;
