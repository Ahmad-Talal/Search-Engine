import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch,useSelector} from 'react-redux'
import {searchVideo} from '../actions/searchActions'
import Button from '@mui/material/Button';
import {Row,Col} from 'react-bootstrap'
import Link from '@mui/material/Link';
import axios from 'axios'
import {
    VIDEO_SEARCH_REQUEST,
} from '../constants/searchConstants';
import {
    searchCache
  } from "../actions/cacheActions";

import Pathways from '../Pathway';

const  VideoScreen=({history})=> {
    const dispatch=useDispatch()   

    const videoSearch = useSelector(state=>state.videoSearch)
    const {loading,video_result,error} = videoSearch

    const cacheSearch = useSelector(state=>state.cacheSearch)
    const {cache} = cacheSearch

    let term = JSON.parse(localStorage.getItem("query"));
    let user = JSON.parse(localStorage.getItem("user")); 
    const [search,setSearch] = useState(term)
    useEffect(() => {
    
    if(user){
        if(term){
            if (loading){ 
                dispatch(searchVideo(term))
            }  
          }
          else{
            history.push("/")
        }
    
    }
    else{
        history.push("/")
    }
        
    }, [history,user,video_result,loading,error,dispatch,search,term])
    
    const onSearch = (searchTerm) =>{
        setSearch(searchTerm)
    }
  

    const onClickCall = (query)=>
    {
        let temp = query
        localStorage.setItem('query', JSON.stringify(query.replace(/\s/g, '+')))
        term = JSON.parse(localStorage.getItem("query"));
        //setLoading(true)
        dispatch({type:VIDEO_SEARCH_REQUEST})

        async function createSearch(){
                  
            try{              
                await axios.post(
                `http://127.0.0.1:8000/api/search/create/${user}/`,
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
<Pathways video/>
<Row>
<Col md={12}>
<h2 style={{color:"blue"}}>Video Results</h2>
{video_result.results.length > 0 &&(
    
    <p>About {video_result.total} results ({video_result.ts.toFixed(2)} seconds)</p>
)}

{
  video_result.results.length >0 ?
  video_result.results.map((item,index)=>{
      return(
            <div key={index}>
                <Link href={`${item.link}`}>
                    <p style={{color:"black",cursor:"pointer"}}>{ item.cite.domain ? item.cite.domain : item.link}</p>
                </Link>
                <Link href={`${item.link}`}>
                    <h5 className="txt" style={{color:"blue",cursor:"pointer"}}>{item.title}</h5>
                </Link>                
                <p>{item.description}</p>
                {item.additional_links && (
                    <Row>
                 
                    {
                    item.additional_links.map((add,ind)=>{
                        return (
                                <Col key={ind}>
                                    <Link href={`${add.href}`}>
                                        <p style={{color:"blue",cursor:"pointer"}}>{add.text}</p>
                                    </Link>
                                </Col>
                        )
                    })
                    }
                    </Row>
                )}
                <br></br>
                <br></br>
            </div>
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
</Col>
</Row>
</div>
)

  }
  </div>
    
  );
}

export default VideoScreen;
