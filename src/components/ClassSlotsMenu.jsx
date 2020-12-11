import React, { Component } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import {
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import ClassCreationModal from './ClassCreationModal';
class ClassSlotsMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      formData: {
        range: 50
      },
      availableInstructors: 0
    };
  }
  
  handleMenuClick = (e, selectedClass) => {
    this.props.handleClassTimeSelection(selectedClass);
  }

  handleCreateClassClick = () => {
    this.props.handleCreateClass(this.state.formData);
  }

  onModalInputChange = (e, s) => {
    if(s && s.name) {
      this.setState({
        formData: {
          ...this.state.formData,
          [s.name]: s.value
        }
      });
    } else {
      this.setState({
        formData: {
          ...this.state.formData,
          [e.target.type]: e.target.value
        }
      });
    } 
  }

  handleClassTypeClick = e => {
    this.props.handleClassTypeClick(e.target.textContent);
  }

  popover = () => {
    const { selectedClassTime} = this.props;

    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Choose class you want to create</Popover.Title>
        {selectedClassTime && selectedClassTime.value && selectedClassTime.value.classSuggestions
        && selectedClassTime.value.classSuggestions.map(classType => (
          <Popover.Content onClick={this.handleClassTypeClick}>{classType.className}</Popover.Content>
        ))}
        
      </Popover>
    )
    }

  getDate = () => {
    const { selectedChartItem} = this.props;
    const date = new Date(selectedChartItem.classDate);
    const  options = { month: 'long'};
    const mm = new Intl.DateTimeFormat('en-US', options).format(date);
    const dd = String(date.getDate()).padStart(2, '0');
    
    return mm.substr(0, 3) + ' ' + dd;
  }

  getParsedDate = date => {
    const dateObj = new Date(date);

    return dateObj.toLocaleTimeString('en-US');
  }

  getAvailableInstructorsPerClass = () => {
    const { selectedClassTime, selectedClassType } = this.props;
    let availableInstructors = [];

    selectedClassTime && selectedClassTime.value 
    && selectedClassTime.value.classSuggestions 
      && selectedClassTime.value.classSuggestions.forEach(classSuggestion => {
      if(classSuggestion.className === selectedClassType) {
        availableInstructors = classSuggestion.availableInstructors;
      }
    });
    const parsedAvailableInstructors = [];
  
    availableInstructors.forEach(instructor => {
      parsedAvailableInstructors.push({
        key: instructor.name.toLowerCase(),
        value: instructor.id,
        text: instructor.name,
      })
    })
    
    return parsedAvailableInstructors;
  }

    render() {
      const {isModalOpen, toggleModalState, availableInstructors, suggestedClassesPerDate, selectedClassTime} = this.props;

      return (
        <div>
          <Menu vertical>
            <Menu.Item
              key='menu-header'
              active={true}
              >
                <h5>
                {`Required Classes for ${this.getDate()}
                  (Available instructors - ${availableInstructors ? availableInstructors.length : 0 })`}
                </h5>
            </Menu.Item>
              {suggestedClassesPerDate && suggestedClassesPerDate.length > 0 ? suggestedClassesPerDate.map(suggestedClassPerDate => (
                <OverlayTrigger trigger="click" placement="right" overlay={this.popover()} rootClose={true}>
                  <Menu.Item
                    key={this.getParsedDate(suggestedClassPerDate.classSuggestedDate)}
                    name={this.getParsedDate(suggestedClassPerDate.classSuggestedDate)}
                    value={suggestedClassPerDate}
                    active={selectedClassTime.name === this.getParsedDate(suggestedClassPerDate.classSuggestedDate)} //TODO: fix
                    onClick={this.handleMenuClick}
                  >
                    <Label>{suggestedClassPerDate.classSuggestions.length}</Label>
                    {this.getParsedDate(suggestedClassPerDate.classSuggestedDate)}
                  </Menu.Item>
                </OverlayTrigger>
              )) : (
                <Menu.Item
              key='no-item'
              active={true}
              >
                <h5>
                  No Suggestion for this date.
                </h5>
            </Menu.Item>
              )}
          </Menu>
          <ClassCreationModal
            isModalOpen={isModalOpen}
            toggleModalState={toggleModalState}
            handleCreateClassClick={this.handleCreateClassClick}
            onModalInputChange={this.onModalInputChange}
            selectedClassType={this.props.selectedClassType}
            instructorOptions={this.getAvailableInstructorsPerClass()}
            range={this.state.formData.range}
          />
        </div>
      );
    }
  }
  
  export default ClassSlotsMenu;
  