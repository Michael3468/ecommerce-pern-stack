import { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { createType } from '../../http/deviceAPI';

type Props = {
  show: boolean;
  onHide: () => void;
};

const CreateType: FC<Props> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>('');
  const [addTypeDisabledButtonStatus, setAddTypeDisabledButtonStatus] = useState<boolean>(true);

  const addType = () => {
    createType({ name: value }).then(() => setValue(''));
    onHide();
  };

  useEffect(() => {
    if (value) {
      setAddTypeDisabledButtonStatus(false);
    } else {
      setAddTypeDisabledButtonStatus(true);
    }
  }, [value]);

  return (
    <Modal size="sm" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Type name"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" disabled={addTypeDisabledButtonStatus} onClick={addType}>
          Add Type
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
