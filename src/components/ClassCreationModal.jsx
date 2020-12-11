import {
    Modal,
    Button,
    Form,
    Col
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';

const ClassCreationModal = ({isModalOpen, toggleModalState, handleCreateClassClick, onModalInputChange, selectedClassType, instructorOptions, range}) => (
    <Modal show={isModalOpen} onHide={toggleModalState}>
        <Modal.Header closeButton>
          <Modal.Title>Create a class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridClassType">
                <Form.Label>Class Type</Form.Label>
                <Form.Control type="classType" placeholder="Class Type" value={selectedClassType} disabled onChange={onModalInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                    <Form.Label>Instructor</Form.Label>
                    <Dropdown placeholder='Select Instructor' name="instructor" fluid selection options={instructorOptions} onChange={onModalInputChange} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formBasicRangeCustom">
                <Form.Label>{"Capacity: "}</Form.Label>
                <Form.Label> {range ? range : 50} </Form.Label>
                <Form.Control type="range" value={range} custom onChange={onModalInputChange} />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModalState}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateClassClick}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
  );

export default ClassCreationModal;