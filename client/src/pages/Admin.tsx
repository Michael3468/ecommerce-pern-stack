import { useState } from 'react';
import { Button, Col, Container } from 'react-bootstrap';

import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { headerHeight } from '../utils/constants';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState<boolean>(false);
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false);
  const [typeVisible, setTypeVisible] = useState<boolean>(false);

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: window.innerHeight - headerHeight }}
    >
      <Col sm={12} md={6} className="d-flex flex-column ms-auto me-auto mt-auto mb-auto">
        <Button variant="outline-dark" className="mt-4" onClick={() => setTypeVisible(true)}>
          Add Type
        </Button>
        <Button variant="outline-dark" className="mt-4" onClick={() => setBrandVisible(true)}>
          Add Brand
        </Button>
        <Button variant="outline-dark" className="mt-4" onClick={() => setDeviceVisible(true)}>
          Add Device
        </Button>

        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
        <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      </Col>
    </Container>
  );
};

export default Admin;
