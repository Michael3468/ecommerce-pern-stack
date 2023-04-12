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
  const { deviceStore } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => deviceStore.setTypes(data));
    fetchBrands().then((data) => deviceStore.setBrands(data));
    fetchDevices({ typeId: undefined, brandId: undefined, page: 1, limit: 2 }).then((data) => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
    });
  }, [deviceStore]);

  useEffect(() => {
    fetchDevices({
      typeId: deviceStore.selectedType.id ? deviceStore.selectedType.id : undefined,
      brandId: deviceStore.selectedBrand.id ? deviceStore.selectedBrand.id : undefined,
      page: deviceStore.page,
      limit: 2,
    }).then((data) => {
      deviceStore.setDevices(data.rows);
      deviceStore.setTotalCount(data.count);
    });
  }, [deviceStore, deviceStore.page, deviceStore.selectedType, deviceStore.selectedBrand]);

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
