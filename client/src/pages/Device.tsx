import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import noImage from '../assets/images/no-image.png';
import bigStar from '../assets/images/star.svg';

const Device = () => {
  const device = { id: 1, name: 'Iphone 12 Pro', price: 24999, rating: 1, img: '' };
  const description = [
    { id: 1, title: 'RAM', description: '8GB' },
    { id: 2, title: 'Camera', description: '5MP' },
    { id: 3, title: 'CPU', description: '' },
    { id: 4, title: 'Cores', description: '2' },
    { id: 5, title: 'Battery', description: '5000mAh' },
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className="d-flex align-items-center">
          <Image
            className="ms-auto me-auto"
            width={300}
            height={300}
            src={device.img.length ? device.img : noImage}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="d-flex align-items-center justify-content-center">{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 250,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 48,
                filter:
                  'invert(51%) sepia(66%) saturate(964%) hue-rotate(16deg) brightness(141%) contrast(119%)',
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around ms-auto me-auto"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>{`From: ${device.price} ¥`}</h3>
            <Button variant="outline-dark">Add to Cart</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column mt-5">
        <Col>
          <h3>Characteristics</h3>
          {description.map((info, index) => (
            <div
              key={info.id}
              style={{
                background: index % 2 === 0 ? 'lightgray' : 'transparent',
                padding: 10,
                borderRadius: 5,
              }}
            >
              {`${info.title}: ${info.description}`}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Device;
