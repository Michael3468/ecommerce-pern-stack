import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { StoreContext } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { deviceStore } = useContext(StoreContext);

  return (
    <Row className="d-flex mb-5">
      {deviceStore.devices.map((d) => (
        <Col key={d.id} sm={6} lg={3}>
          <DeviceItem device={d} />
        </Col>
      ))}
    </Row>
  );
});

export default DeviceList;
