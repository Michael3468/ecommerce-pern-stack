import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { Context } from '../index';

const BrandBar = observer(() => {
  const { deviceStore } = useContext(Context);

  return (
    <Row className="d-flex mt-3">
      {deviceStore.brands.map((brand) => (
        <Col sm={3}>
          <Card
            key={brand.id}
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
