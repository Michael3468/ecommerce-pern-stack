import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import noImage from '../assets/images/no-image.png';
import bigStar from '../assets/images/star.svg';
import { fetchOneDevice } from '../http/deviceAPI';
import { IDevice } from '../types';

const Device = () => {
  const [device, setDevice] = useState<IDevice | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(Number(id)).then((data) => {
      setDevice(data);
    });
  }, [id]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className="d-flex align-items-center mb-3">
          <Image
            className="ms-auto me-auto w-100"
            width={300}
            height={300}
            src={device && device.img.length ? process.env.REACT_APP_API_URL + device.img : noImage}
          />
        </Col>
        <Col md={4} className="mb-3">
          <Row className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="d-flex align-items-center justify-content-center">{device?.name}</h2>
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
              {device?.rating}
            </div>
          </Row>
        </Col>
        <Col md={4} className="mb-3">
          <Card
            className="d-flex flex-column align-items-center justify-content-around ms-auto me-auto"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>{`From: ${device?.price ? device.price : 9999} ¥`}</h3>
            <Button variant="outline-dark">Add to Cart</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column mt-5 mb-5">
        <Col>
          <h3>Characteristics</h3>
          {device?.info?.map((info, index) => (
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
