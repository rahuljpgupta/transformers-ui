import {
    Modal,
    Button,
    Form,
    Col
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'
import dropdownOptions, { timingOptions, instructorOptions } from '../data/dropdownOptions';

const ClassCreationModal = ({isModalOpen, toggleModalState, handleCreateClassClick, onModalInputChange}) => (
    <Modal show={isModalOpen} onHide={toggleModalState}>
        <Modal.Header closeButton>
          <Modal.Title>Create a class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridClassType">
                <Form.Label>Class Type</Form.Label>
                <Form.Control type="classType" placeholder="Class Type" disabled onChange={onModalInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                    <Form.Label>Instructor</Form.Label>
                    <Dropdown placeholder='Select Instructor' name="instructor" fluid selection options={instructorOptions} onChange={onModalInputChange} />
                </Form.Group>
            </Form.Row>
            
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Preffered days in the week</Form.Label>
                <Dropdown placeholder='Preffered days in the week' name="daysOfWeek" fluid multiple selection options={dropdownOptions} onChange={onModalInputChange} />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Preffered timing</Form.Label>
                <Dropdown placeholder='Preffered timing' name="prefferedTiming" fluid multiple selection options={timingOptions} onChange={onModalInputChange} />
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