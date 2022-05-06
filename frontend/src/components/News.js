import React, {useEffect} from 'react';
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

import Loader from '../components/Loader';
import Message from '../components/Message';

import {searchNews} from '../actions/newsActions'

const  News=({history})=> {
    const dispatch=useDispatch()   

    const newsSearch = useSelector(state=>state.newsSearch)
    const {loading,news,error} = newsSearch
    useEffect(() => {
        if (loading){ 
            dispatch(searchNews())
        }  

    }, [history,news,loading,error,dispatch])
    
  return (
  <div> 
  <br></br>
  <br></br>
  {loading ? <Loader/> :
  
      error ? <Message variant='dark'>{error}</Message>:
  (
  <div>
<h2 style={{color:"blue"}}>TRENDING NEWS</h2>
<Container sx={{ py: 8 }} maxWidth="lg">
<Grid container spacing={4}>
{
  news.value.length >0 ?
  news.value.map((item,index)=>{
      return(
           
          <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  style = {{padding: "2rem 0rem"}}
                  sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <Link href={`${item.image.url}`}>
                  <CardMedia
                    component="img"
                  
                    image = {`${item.image.url}`}
                    alt   =   ""
                  />
                  </Link>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                     {item.title}
                    </Typography>
                    <Link href={`${item.url}`}>    
                        <Typography>
                        {item.description}
                        </Typography>
                    </Link>
                  </CardContent>
                  <CardActions>
                  <Link href={`${item.url}`}>    
                    <Button size="small">View</Button>
                  </Link>
                  </CardActions>
                </Card>
            </Grid>
      )
  })
  :<div>
    No news so far 
    Stay in touch   
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

export default News;
