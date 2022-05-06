import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useDispatch} from 'react-redux'

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CompassTwoTone  } from '@ant-design/icons';
import {LinkContainer} from 'react-router-bootstrap'

import HomeScreen from './screens/HomeScreen'
import AllScreen from './screens/AllScreen'
import ImageScreen from './screens/ImageScreen'
import VideoScreen from './screens/VideoScreen'

import {
  WEATHER_SEARCH_REQUEST,
} from "./constants/weatherConstants";
import {
  NEWS_SEARCH_REQUEST,
} from "./constants/newsConstants";

import {searchCache} from './actions/cacheActions'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Ahmad-Talal">
        Talal's Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function App() {  
  const dispatch=useDispatch()  
  const refresh = () =>{
    let user = JSON.parse(localStorage.getItem("user")); 
    dispatch({type:WEATHER_SEARCH_REQUEST})
    dispatch({type:NEWS_SEARCH_REQUEST})
    dispatch(searchCache(user))
}

  return (
    <Router >
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <LinkContainer onClick={refresh} to='/'>
          <CompassTwoTone />
        </LinkContainer>
        
        <LinkContainer onClick={refresh} to='/'>
          <Button size="small" variant="contained">
            <Typography variant="h6" color="inherit" noWrap >
              Exploru
            </Typography>
          </Button>
          
          </LinkContainer>
        </Toolbar>
      </AppBar>


      <main className="py-3">
      <Container>
      
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/all' component={AllScreen} exact/>
        <Route path='/images' component={ImageScreen} exact/>
        <Route path='/videos' component={VideoScreen} exact/>

      </Container>
      </main>

      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          For your Ease
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
         Anything you can search!
        </Typography>
        <Copyright />
      </Box>
      </ThemeProvider>
      </Router>
  );
}

export default App;
