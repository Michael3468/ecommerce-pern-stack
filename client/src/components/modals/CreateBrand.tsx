import { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { createBrand } from '../../http/deviceAPI';

type Props = {
  show: boolean;
  onHide: () => void;
};

const CreateBrand: FC<Props> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>('');

  const addBrand = () => {
    createBrand({ name: value }).then(() => setValue(''));
    onHide();
  };

  return (
    <Modal size="sm" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Brand name"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Add Brand
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
