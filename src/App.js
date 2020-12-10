import React, { Component } from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
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
      isModalOpen: false
    };
  }

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
    console.log('ee', e)
    this.setState({
      selectedChartItem: e,
    })
  }

  toggleModalState = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
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
            <ChartDropdown handleChartSelection={this.handleChartSelection} selectedChart={this.state.selectedChart} />
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
        />
        )}
      </Container>
    </div>
    );
  };
}

export default App;
