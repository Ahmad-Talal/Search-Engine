import { useState ,useEffect} from "react";
import './styles.css';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import {All_SEARCH_REQUEST} from '../constants/searchConstants'
import {searchCache} from '../actions/cacheActions'

import { useDispatch,useSelector } from "react-redux";
import axios from 'axios'
const Search = () => {
    const dispatch = useDispatch();
    const cacheSearch = useSelector(state=>state.cacheSearch)
    const {loading,cache,error} = cacheSearch
    const [search,setSearch] = useState("")
    
    let history = useHistory();
    let user = JSON.parse(localStorage.getItem("user")); 

    useEffect(() => {
    
        if (user){
            if (loading){ 
                dispatch(searchCache(user))
            }  
        } 
        else{
                
        async function createCookie(){
                  
            try{              
            const {data} =await axios.post(
                `http://ec2-3-144-183-187.us-east-2.compute.amazonaws.com/api/cookie/create/`,
                {},
                )
            localStorage.setItem('user', JSON.stringify(data._id))
            }
            catch(err){
               // console.log(err)
            }
            
        }
        createCookie()
        dispatch(searchCache(user))
        }
    }, [history,user,search,loading,cache,error,dispatch])
    
    const onSearch = (searchTerm) =>{
            setSearch(searchTerm)
    }
    const onClickCall = (query)=>{
        let temp = query
        localStorage.setItem('query', JSON.stringify(query.replace(/\s/g, '+')))
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

          history.push(`/all`)
     
    }   
    return(
        <div className="App">
            <h1>Search</h1> 
            <div className="search-container">
                <div className="search-inner">
                   <input type="text" value={search } placeholder="Search here" 
                    onChange={(e)=>setSearch(e.target.value)}>
                    </input>
                    <Button size="small" variant="contained" onClick={()=>onClickCall(search)}>Search</Button>
                </div>
                <div className="dropdown">
                    {cache.filter( (item)=>search&&search!==item.search&&item.search.includes(search)).slice(0,10).map( (item)=>(
                        <div onClick={()=>onSearch(item.search)} className="dropdown-row" key={item._id}>{item.search}</div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Search;
