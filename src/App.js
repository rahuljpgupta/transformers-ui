import React, { Component } from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import axios from 'axios';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ChartDropdown from './components/ChartDropdown';
import NavigationBar from './components/NavigationBar';
import ChartHeader from './components/ChartHeader';
import ChartContainer from './components/ChartContainer';
import ClassSlotsMenu from './components/ClassSlotsMenu';
import suggestedClasses from './data/suggestedClasses';
import chartData from './data/ariaChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedChart: 'Bar',
      activeSuggestedClass: '',
      selectedChartItem: null,
      isModalOpen: false,
      selectedDates: null,
    };
  }

  handleDatesChange = (event, data) => {
    console.log('data', data)
    this.setState({
      selectedDates: data.value
    })
  };

  handleChartSelection = e => {
    this.setState({
      selectedChart: e,
    })
  }

  handleClassSelection = (name) => {
    this.setState({
      activeSuggestedClass: name,
    })
  }

  handleChartItemClick = e => {
    this.setState({
      selectedChartItem: e,
    })
  }

  toggleModalState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleCreateClass = () => {
    console.log('handleCreateClass');
    this.postCreateClass();
    //TODO: Hit the save api
    this.setState({
      selectedChartItem: null,
      isModalOpen: !this.state.isModalOpen
    })
  }

  fetchForecast = () => {
    axios.get('https://transformer-businessengine.azurewebsites.net/api/Forecast')
    .then(res=> {
      console.log('fetchForecast', res);
    });
  }

  fetchTrafficPrediction = () => {
    axios.get('https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor')
    .then(res=> {
      console.log('fetchTrafficPrediction', res);
    });
  }

  fetchClassSuggestion = () => {
    axios.get('https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor/ClassSuggestion')
    .then(res=> {
      console.log('fetchClassSuggestion', res);
    });
  }

  fetchAvailableInstructors = () => {
    axios.get('https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor/AvailableInstructor')
    .then(res=> {
      console.log('fetchAvailableInstructors', res);
    });
  }

  postCreateClass = () => {
    const classToCreate = {
      clientId: "string",
      scheduledDate: "2020-12-11T05:48:12.504Z",
      startTime: "string",
      endTime: "string",
      className: "string",
      classType: "string",
      instructorId: 0,
      capacity: 0,
      description: "string"
    }
    axios.post('https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor', classToCreate)
    .then(res=> {
      console.log('postCreateClass', res);
    });
  }

  componentDidMount() {
    this.fetchForecast();
    this.fetchTrafficPrediction();
    this.fetchClassSuggestion();
    this.fetchAvailableInstructors();
  }
  
  render() {
    return (
      <div className="App">
      <NavigationBar />
      <Container>
        <ChartHeader />
        <Row>
          <Col>
            <ChartContainer
              chartData={chartData}
              selectedChart={this.state.selectedChart}
              handleChartItemClick={this.handleChartItemClick}
            />
          </Col>
          <div>
            <ChartDropdown handleChartSelection={this.handleChartSelection} selectedChart={this.state.selectedChart} />
            <h3>Select dates</h3>
            <SemanticDatepicker onChange={this.handleDatesChange} type="range" />
          </div>
          <Col>
          </Col>
        </Row>
        {this.state.selectedChartItem && (
        <ClassSlotsMenu
          handleClassSelection={this.handleClassSelection}
          activeSuggestedClass={this.state.activeSuggestedClass}
          suggestedClasses={suggestedClasses}
          isModalOpen={this.state.isModalOpen}
          toggleModalState={this.toggleModalState}
          handleCreateClass={this.handleCreateClass}
        />
        )}
      </Container>
    </div>
    );
  };
}

export default App;
