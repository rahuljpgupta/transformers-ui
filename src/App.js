import './App.css';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import ComposedChartView from './charts/ComposedChartView';
import AreaChartView from './charts/AreaChartView';
import BarChartView from './charts/BarChartView';
import LineChartView from './charts/LineChartView';

function App() {
  
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <ComposedChartView />
            <AreaChartView />
            <BarChartView />
            <LineChartView />
          </Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
