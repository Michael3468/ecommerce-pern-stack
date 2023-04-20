import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { StoreContext } from '../index';

const BrandBar = observer(() => {
  const { deviceStore } = useContext(StoreContext);

  return (
    <Row className="d-flex mt-3">
      {deviceStore.brands.map((brand) => (
        <Col key={brand.id} sm={3}>
          <Card
            className="p-2 align-items-center"
            style={{ cursor: 'pointer' }}
            border={brand.id === deviceStore.selectedBrand.id ? 'primary' : 'light'}
            onClick={() => deviceStore.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
