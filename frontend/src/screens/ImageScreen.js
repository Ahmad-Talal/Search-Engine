import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux'

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios'

import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  searchCache
} from "../actions/cacheActions";
import {searchImage} from '../actions/searchActions'
import {
    IMAGE_SEARCH_REQUEST,
} from '../constants/searchConstants';
import Pathways from '../Pathway';

const  ImageScreen=({history})=> {
    const dispatch=useDispatch()   

    const imageSearch = useSelector(state=>state.imageSearch)
    const {loading,image_result,error} = imageSearch

    const cacheSearch = useSelector(state=>state.cacheSearch)
    const {cache} = cacheSearch
    
    let term = JSON.parse(localStorage.getItem("query"));
    let user = JSON.parse(localStorage.getItem("user")); 
    const [search,setSearch] = useState(term)
    useEffect(() => {
      if(user){
        if(term){
          if (loading){ 
              dispatch(searchImage(term))
          }  
        }
        else{
          history.push("/")
      }
      }
      else{
        history.push("/")
      }
        

    }, [history,image_result,user,loading,error,dispatch,search,term])
    
    const onSearch = (searchTerm) =>{
      setSearch(searchTerm)
  }

    const onClickCall = (query)=>
    {
        let temp = query
        localStorage.setItem('query', JSON.stringify(query.replace(/\s/g, '+')))
        term = JSON.parse(localStorage.getItem("query"));
        //setLoading(true)
        dispatch({type:IMAGE_SEARCH_REQUEST})

        async function createSearch(){
                  
          try{              
              await axios.post(
              `http://ec2-3-144-183-187.us-east-2.compute.amazonaws.com/api/search/create/${user}/`,
              {"search":temp},
              )
          }
          catch(err){
              console.log(err)
          }
          
      }
      createSearch()

      setTimeout(() => {
          dispatch(searchCache(user)) 
        }, 2000);
    } 

  return (
  <div> 
  {loading ? <Loader/> :
  
      error ? <Message variant='dark'>{error}</Message>:
  (
  <div>
  <div className="App">
  <h1>Search</h1> 
  <div className="search-container">
      <div className="search-inner">
          <input type="text" value={search } placeholder="Search here" 
          onChange={(e)=>setSearch(e.target.value)}>
          </input>
          
          <br></br>
          <Button size="small" variant="contained" onClick={()=>onClickCall(search)}>Search</Button>
      </div>

      <div className="dropdown">
                    {cache.filter( (item)=>search&&search!==item.search&&item.search.includes(search)).slice(0,10).map( (item)=>(
                        <div onClick={()=>onSearch(item.search)} className="dropdown-row" key={item._id}>{item.search}</div>
                    ))}
      </div>
      <br></br>
  </div>
</div>
<Pathways  image/>
<h2 style={{color:"blue"}}>IMAGE Results</h2>
<Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
{
  image_result.image_results.length >0 ?
  image_result.image_results.map((item,index)=>{
      return(
           
          <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  style = {{padding: "2rem 0rem"}}
                  sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <Link href={`${item.image.src}`}>
                  <CardMedia
                    component="img"
                  
                    image = {`${item.image.src}`}
                    alt   =   {`${item.image.alt}`}
                  />
                  </Link>
                  <CardContent>
                    <Link href={`${item.link.href}`}>    
                        <Typography>
                        {item.link.title ? item.link.title : item.link.domain ? item.link.domain : "No Description"}
                        </Typography>
                    </Link>
                  </CardContent>
                  <CardActions>
                  <Link href={`${item.link.href}`}>    
                    <Button size="small">View</Button>
                  </Link>
                  </CardActions>
                </Card>
            </Grid>
      )
  })
  :<div>
    <h3>your search did not match any documents</h3>
    <h4>Suggestions:</h4>
    <ul>
    <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        <li>Try fewer keywords.</li>
    </ul>  
  </div>
}

</Grid>
</Container>
</div>
)
}
</div>    
);
}

export default ImageScreen;
