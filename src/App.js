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

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedChart: 'Bar',
      selectedClassTime: '',
      selectedChartItem: null,
      isModalOpen: false,
      selectedDates: null,
    };
  }

  handleDatesChange = (event, data) => {
    if(data.value && data.value.length === 2 ) {
      let startDate = new Date(data.value[0]);
      let endDate = new Date(data.value[1]);
      const dd1 = String(startDate.getDate()).padStart(2, '0');
      const mm1 = String(startDate.getMonth() + 1).padStart(2, '0');
      const yyyy1 = startDate.getFullYear();
      const dd2 = String(endDate.getDate()).padStart(2, '0');
      const mm2 = String(endDate.getMonth() + 1).padStart(2, '0');
      const yyyy2 = endDate.getFullYear();

      startDate = mm1 + '/' + dd1 + '/' + yyyy1;
      endDate = mm2 + '/' + dd2 + '/' + yyyy2;

      this.fetchTrafficPrediction(startDate, endDate);
    } else if (data.value === null) {
      this.fetchTrafficPrediction();
    }
    
    this.setState({
      selectedDates: data.value
    })
  };

  handleChartSelection = e => {
    this.setState({
      selectedChart: e,
    })
  }

  handleClassTimeSelection = (name) => {
    this.setState({
      selectedClassTime: name,
    })
  }

  handleChartItemClick = e => {
    let date = new Date(e.classDate);
    const  options = { month: 'long'};
    const mm = new Intl.DateTimeFormat('en-US', options).format(date);
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
   
    this.fetchAvailableInstructors(date);
    this.fetchClassSuggestion(date);

    this.setState({
      selectedChartItem: e,
    })
  }

  toggleModalState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleCreateClass = (formData) => {
    if(!formData.instructor) {
      alert('Please select the instructor for the class');
      return;
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const startTime = this.state.selectedClassTime && this.state.selectedClassTime.name;
    const endTime = (Number(startTime.split(':')[0]) + 1).toString() + ':00';

    const payload = {
      scheduledDate: today,
      startTime,
      endTime,
      className: this.state.selectedClassType,
      instructorId: formData.instructor,
      capacity: Number(formData.range ? formData.range : 50) ,
      classId: 0
    }
    this.postCreateClass(payload);
    this.setState({
      selectedChartItem: null,
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleClassTypeClick = className => {
    this.setState({
      selectedClassType: className,
      isModalOpen: true
    })
  }

  fetchForecast = () => {
    axios.get('https://transformer-businessengine.azurewebsites.net/api/Forecast')
    .then(res=> {
      console.log('fetchForecast', res);
    });
  }

  fetchTrafficPrediction = (startDate, EndDate) => {
    let start, end;
    if(!startDate) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      start = mm + '/' + dd + '/' + yyyy;
    } else {
      start = startDate;
    }
    if(!EndDate) {
      let today = new Date();
      const dd7 = String(today.getDate() + 7).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      end = mm + '/' + dd7 + '/' + yyyy;
    } else {
      end = EndDate;
    }

    axios.get(`https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor?StartDate=${start}&EndDate=${end}`)
    .then(res=> {
      this.setState({
        trafficPredictionData: res.data.data
      })
    });
  }

  fetchAvailableInstructors = (date) => {
    axios.get(`https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor/AvailableInstructor/?AvailableDate=${date}`)
    .then(res=> {
      this.setState({
        availableInstructors: res.data.data.availableInstructors
      })
    });
  }

  fetchClassSuggestion = (date) => {
    // const date1 = '1/3/2020'; //TODO: remove after api working properly
    axios.get(`https://transformer-businessengine.azurewebsites.net/api/TrafficPredictor/ClassSuggestion?ClassSuggestedDate=${date}`)
    .then(res=> {
      this.setState({
        suggestedClassesPerDate: res.data.data
      })
    });
  }

  postCreateClass = (payload) => {
    axios.post('https://transformer-businessengine.azurewebsites.net/api/ScheduleClass', payload)
    .then(res=> {
      alert("Class created successfully")
    });
  }

  componentDidMount() {
    this.fetchTrafficPrediction();
  }
  
  render() {
    const { suggestedClassesPerDate } = this.state;
    return (
      <div className="App">
      <NavigationBar />
      <Container>
        <ChartHeader />
        <Row>
          <Col>
            <ChartContainer
              chartData={this.state.trafficPredictionData}
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
          handleClassTimeSelection={this.handleClassTimeSelection}
          selectedClassTime={this.state.selectedClassTime}
          suggestedClassesPerDate={suggestedClassesPerDate}
          isModalOpen={this.state.isModalOpen}
          toggleModalState={this.toggleModalState}
          handleCreateClass={this.handleCreateClass}
          selectedChartItem={this.state.selectedChartItem}
          availableInstructors={this.state.availableInstructors}
          handleClassTypeClick={this.handleClassTypeClick}
          selectedClassType={this.state.selectedClassType}
        />
        )}
      </Container>
    </div>
    );
  };
}

export default App;
