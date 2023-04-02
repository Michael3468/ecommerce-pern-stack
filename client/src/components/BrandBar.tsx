import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { Context } from '../index';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex mt-3">
      {device.brands.map((brand) => (
        <Col sm={3}>
          <Card
            key={brand.id}
            className="p-2 align-items-center"
            style={{ cursor: 'pointer' }}
            border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
