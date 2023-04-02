import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Context } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.devices.map((d) => (
        <Col sm={6} md={3}>
          <DeviceItem key={d.id} device={d} />
        </Col>
      ))}
    </Row>
  );
});

export default DeviceList;