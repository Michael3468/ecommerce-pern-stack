import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { StoreContext } from '../../index';

// TODO: TDeviceInfo ?
type TInfo = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  show: boolean;
  onHide: () => void;
};

// TODO storybook
const CreateDevice: FC<Props> = observer(({ show, onHide }) => {
  const { deviceStore } = useContext(StoreContext);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<TInfo[]>([]);
  const [addDeviceDisabledButtonStatus, setAddDeviceDisabledButtonStatus] = useState<boolean>(true);

  const addInfo = () => {
    setInfo([{ title: '', description: '', id: Date.now() }, ...info]);
  };

  const removeInfo = (id: number) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key: string, value: string, id: number) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file as File); // TODO: add 'if (file)' or disable 'Add deviceStore' button if file not selected
    formData.append('brandId', `${deviceStore.selectedBrand.id}`);
    formData.append('typeId', `${deviceStore.selectedType.id}`);
    formData.append('info', JSON.stringify(info));

    createDevice(formData).then(() => onHide());
  };

  useEffect(() => {
    fetchTypes().then((data) => deviceStore.setTypes(data));
    fetchBrands().then((data) => deviceStore.setBrands(data));
  }, [deviceStore]);

  useEffect(() => {
    if (name && price && deviceStore.selectedType.name && deviceStore.selectedBrand.name) {
      setAddDeviceDisabledButtonStatus(false);
    } else {
      setAddDeviceDisabledButtonStatus(true);
    }
  }, [name, price, deviceStore.selectedBrand, deviceStore.selectedType]);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle className="w-100">
              {deviceStore.selectedType.name || 'Choose Type'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {deviceStore.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => deviceStore.setSelectedType(type)}
                  className="d-flex justify-content-center"
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle className="w-100">
              {deviceStore.selectedBrand.name || 'Choose Brand'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {deviceStore.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => deviceStore.setSelectedBrand(brand)}
                  className="d-flex justify-content-center"
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter device name"
          />
          <Form.Control
            className="mt-3"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter device price"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} required />

          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Add new property
          </Button>
          {info.map((i) => (
            <Card key={i.id} className="mt-2 mb-2 p-2">
              <Row className="mt-2">
                <Col lg={5} className="mb-2">
                  <Form.Control
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.id)}
                    placeholder="Name"
                  />
                </Col>
                <Col lg={5} className="mb-2">
                  <Form.Control
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                    placeholder="Description"
                  />
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
        <Button
          variant="outline-success"
          disabled={addDeviceDisabledButtonStatus}
          onClick={addDevice}
        >
          Add Device
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
