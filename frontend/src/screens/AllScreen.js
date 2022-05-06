import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch,useSelector} from 'react-redux'
import {searchAll} from '../actions/searchActions'
import Button from '@mui/material/Button';
import {Row,Col,ListGroup,Card} from 'react-bootstrap'
import Link from '@mui/material/Link';
import axios from 'axios'
import {
    searchCache
} from "../actions/cacheActions";
import {
    All_SEARCH_REQUEST,
} from '../constants/searchConstants';
import Pathways from '../Pathway';

const  AllScreen=({history})=> {
    const dispatch=useDispatch()   

    const allSearch = useSelector(state=>state.allSearch)
    const {loading,result,error} = allSearch
    
    const cacheSearch = useSelector(state=>state.cacheSearch)
    const {cache} = cacheSearch
    let term = JSON.parse(localStorage.getItem("query"));
    let user = JSON.parse(localStorage.getItem("user")); 
    const [search,setSearch] = useState(term)
    useEffect(() => {
        if(user){

            if(term){
                if (loading){ 
                    dispatch(searchAll(term))
                    // console.log("ye ",result.result[0].description)
                }  
              }
              else{
                history.push("/")
            }
        
        }
        else{
            history.push("/")
        }

    }, [history,result,user,loading,error,dispatch,search,term])
    
    const onSearch = (searchTerm) =>{
        setSearch(searchTerm)
    }

    const onClickCall = (query)=>
    {
        let temp = query
        localStorage.setItem('query', JSON.stringify(query.replace(/\s/g, '+')))
        term = JSON.parse(localStorage.getItem("query"));

        dispatch({type:All_SEARCH_REQUEST})

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
<Pathways all/>
<Row>
<Col md={8}>
<h2 style={{color:"blue"}}>Search Results</h2>
{result.results.length > 0 &&(
    
    <p>About {result.total} results ({result.ts.toFixed(2)} seconds)</p>
)}

{
  result.results.length >0 ?
  result.results.map((item,index)=>{
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
                                    <Link href={`${add.link}`}>
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

<Col md={4}>
    <Card>
        <ListGroup variant='flush'>
            <h4 style={{color:"black"}}> People also ask for</h4>
            {
                result.answers &&(
                    result.answers.map((ans,i)=>{
                        return(
                            <ListGroup.Item key={i}>
                                <h5 style={{color:"grey"}}>{ans}</h5>
                            </ListGroup.Item>
                        )
                    })
                )
            }   
        </ListGroup>
    </Card>
</Col>
</Row>
</div>
)

  }
  </div>
    
  );
}

export default AllScreen;
