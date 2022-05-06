import Search from '../components/Search';
import News from '../components/News';
import {Row,Col} from 'react-bootstrap'
import Weather from '../components/Weather';
const  HomeScreen=()=> {
  return (
  <>
    <Search/>
    <Row>
      <Col md={9}>
        <News />
      </Col>
      <Col md={3}>
        <Weather />
      </Col>
    </Row>
  </>
    
  );
}

export default HomeScreen;