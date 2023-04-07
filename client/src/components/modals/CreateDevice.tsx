import { FC } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  onHide: () => void;
};

const CreateDevice: FC<Props> = ({ show, onHide }) => (
  <Modal size="sm" centered show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control placeholder="Enter Device name" />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger" onClick={onHide}>
        Close
      </Button>
      <Button variant="outline-success" onClick={onHide}>
        Add Device
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CreateDevice;
