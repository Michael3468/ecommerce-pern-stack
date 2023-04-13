import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { createBrand } from '../../http/deviceAPI';

type Props = {
  show: boolean;
  onHide: () => void;
};

const CreateBrand: FC<Props> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>('');
  const [addBrandDisabledButtonStatus, setAddBrandDisabledButtonStatus] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const addBrand = () => {
    createBrand({ name: value })
      .then(() => {
        onHide();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);

        if (error.response.data.message === 'name must be unique') {
          setErrorMessage('Brand already exists');
        }
      })
      .finally(() => setValue(''));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorMessage('');
  };

  useEffect(() => {
    if (value) {
      setAddBrandDisabledButtonStatus(false);
    } else {
      setAddBrandDisabledButtonStatus(true);
    }
  }, [value]);

  return (
    <Modal size="sm" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={handleChange} placeholder="Enter Brand name" />
          <Modal.Title className="mt-2 text-danger">{errorMessage}</Modal.Title>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="outline-success"
          disabled={addBrandDisabledButtonStatus}
          onClick={addBrand}
        >
          Add Brand
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
