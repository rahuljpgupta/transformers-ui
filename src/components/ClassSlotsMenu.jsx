import { Label, Menu } from 'semantic-ui-react';
import {
  Popover,
  OverlayTrigger,
  Modal,
  Button
} from 'react-bootstrap';

function ClassSlotsMenu({ handleClassSelection, activeSuggestedClass,
  suggestedClasses, isModalOpen, toggleModalState }) {

  const handleMenuClick = (e, {name}) => {
    handleClassSelection(name);
  }

  const handleClose = () => {
    toggleModalState();
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        Ad here's some <strong>amazing</strong> content. It's very engaging.
        right?
        <Button variant="secondary" onClick={toggleModalState}>
            Open Modal
        </Button>
      </Popover.Content>
    </Popover>
  );

  const ClassCreationModal = (
    <Modal show={isModalOpen} onHide={toggleModalState}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModalState}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleModalState}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );

    return (
      <div>
        <Menu vertical>
            {suggestedClasses.map(suggestedClass => (
              <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
                <Menu.Item
                  key={suggestedClass.name}
                  name={suggestedClass.name}
                  value={suggestedClass.name}
                  active={activeSuggestedClass === suggestedClass.name}
                  onClick={handleMenuClick}
                >
                  <Label>{suggestedClass.classCount}</Label>
                  {suggestedClass.time}
                </Menu.Item>
              </OverlayTrigger>
            ))}
        </Menu>
        {ClassCreationModal}
      </div>
    );
  }
  
  export default ClassSlotsMenu;
  