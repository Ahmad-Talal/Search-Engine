import React from 'react';
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {FileSearchOutlined,FileImageOutlined,VideoCameraOutlined} from '@ant-design/icons';
import { useDispatch} from 'react-redux'

 const Pathways = (props) =>{
  
  const dispatch=useDispatch() 
  const send = (t) =>{
    dispatch({type:t})
  }
  return (
      
<Nav className="justify-content-left mb-4">

    <Nav.Item>
    {
          props.all ? (<LinkContainer style={{textDecoration: "underline",color:"blue"}} to='/all'>
            <Nav.Link ><FileSearchOutlined />All</Nav.Link>
        </LinkContainer>)
        :
        <LinkContainer onClick={()=>send("All_SEARCH_REQUEST")} to='/all'>
            <Nav.Link ><FileSearchOutlined />All</Nav.Link>
        </LinkContainer>
    }           
    </Nav.Item>
        
    <Nav.Item>
    {
          props.image ? (<LinkContainer style={{textDecoration: "underline",color:"blue"}} to='/images'>
            <Nav.Link ><FileImageOutlined />Images</Nav.Link>
        </LinkContainer>)
        :
        <LinkContainer onClick={()=>send("IMAGE_SEARCH_REQUEST")} to='/images'>
            <Nav.Link ><FileImageOutlined />Images</Nav.Link>
        </LinkContainer>
    }
    </Nav.Item>

    <Nav.Item>
    {
          props.video ? (<LinkContainer style={{textDecoration: "underline",color:"blue"}} to='/videos'>
            <Nav.Link ><VideoCameraOutlined />Videos</Nav.Link>
        </LinkContainer>)
        :
        <LinkContainer onClick={()=>send("VIDEO_SEARCH_REQUEST")} to='/videos'>
            <Nav.Link ><VideoCameraOutlined />Videos</Nav.Link>
        </LinkContainer>
    }
    </Nav.Item>

</Nav>
  );
}

export default Pathways