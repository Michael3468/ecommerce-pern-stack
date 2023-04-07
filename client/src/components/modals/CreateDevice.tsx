import { FC, useContext, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { Context } from '../../index';

type TInfo = {
  title: string;
  description: string;
  id: number;
};

type Props = {
  show: boolean;
  onHide: () => void;
};

// TODO storybook
const CreateDevice: FC<Props> = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState<TInfo[]>([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', id: Date.now() }]);
  };

  const removeInfo = (id: number) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle className="w-100">Choose Type</Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {device.types.map((type) => (
                <Dropdown.Item key={type.id} className="d-flex justify-content-center">
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle className="w-100">Choose Brand</Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {device.brands.map((brand) => (
                <Dropdown.Item key={brand.id} className="d-flex justify-content-center">
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control className="mt-3" placeholder="Enter device name" />
          <Form.Control className="mt-3" placeholder="Enter device price" type="number" />
          <Form.Control className="mt-3" type="file" />

          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add new property
          </Button>
          {info.map((i) => (
            <Card className="mt-2 mb-2 p-2">
              <Row className="mt-2" key={i.id}>
                <Col lg={5} className="mb-2">
                  <Form.Control placeholder="Name" />
                </Col>
                <Col lg={5} className="mb-2">
                  <Form.Control placeholder="Description" />
                </Col>
                <Col md={2} className="mb-2">
                  <Button variant="outline-danger" onClick={() => removeInfo(i.id)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
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
};

export default CreateDevice;
