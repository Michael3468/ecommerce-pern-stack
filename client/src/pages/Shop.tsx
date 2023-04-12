import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { Context } from '../index';

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices({ typeId: undefined, brandId: undefined, page: 1, limit: 2 }).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device]);

  useEffect(() => {
    fetchDevices({
      typeId: device.selectedType.id ? device.selectedType.id : undefined,
      brandId: device.selectedBrand.id ? device.selectedBrand.id : undefined,
      page: device.page,
      limit: 2,
    }).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device, device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
