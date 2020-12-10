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
      formData: {}
    };
  }
  
  handleMenuClick = (e, {name}) => {
    this.props.handleClassSelection(name);
  }

  handleCreateClassClick = () => {
    this.props.handleCreateClass();
  }

  onModalInputChange = (e, {name, value}) => {
    this.setState({
      formData: {
        [name]: value
      }
    })
  }

  popover = () => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Choose class you want to create</Popover.Title>
      <Popover.Content onClick={this.props.toggleModalState}>Yoga</Popover.Content>
      <Popover.Content onClick={this.props.toggleModalState}>Pillates</Popover.Content>
      <Popover.Content onClick={this.props.toggleModalState}>Gym</Popover.Content>
      <Popover.Content onClick={this.props.toggleModalState}>HIIT</Popover.Content>
    </Popover>
  );

    render() {
      console.log('state', this.state.formData)
      const {isModalOpen, toggleModalState, handleCreateClassClick} = this.props;
      return (
        <div>
          <Menu vertical>
            <Menu.Item
              key='menu-header'
              active={true}
              >
                <h5>
                {`Required Classes for Dec 11
                  Available instructors - 4`}
                </h5>
            </Menu.Item>
              {this.props.suggestedClasses.map(suggestedClass => (
                <OverlayTrigger trigger="click" placement="right" overlay={this.popover()} rootClose={true}>
                  <Menu.Item
                    key={suggestedClass.name}
                    name={suggestedClass.name}
                    value={suggestedClass.name}
                    active={this.props.activeSuggestedClass === suggestedClass.name}
                    onClick={this.handleMenuClick}
                  >
                    <Label>{suggestedClass.classCount}</Label>
                    {suggestedClass.time}
                  </Menu.Item>
                </OverlayTrigger>
              ))}
          </Menu>
          <ClassCreationModal
            isModalOpen={isModalOpen}
            toggleModalState={toggleModalState}
            handleCreateClassClick={handleCreateClassClick}
            onModalInputChange={this.onModalInputChange}
          />
        </div>
      );
    }
  }
  
  export default ClassSlotsMenu;
  