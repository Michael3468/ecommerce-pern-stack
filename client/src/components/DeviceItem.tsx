import { FC, useEffect, useState } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import noImage from '../assets/images/no-image.png';
import star from '../assets/images/star.svg';
import { ROUTE } from '../constants';
import { fetchOneBrand, fetchOneDevice } from '../http/deviceAPI';
import { IDevice } from '../types';

type Props = {
  device: IDevice;
};

const DeviceItem: FC<Props> = ({ device }) => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState<string>('');

  useEffect(() => {
    fetchOneDevice(device.id).then((deviceObj) => {
      fetchOneBrand(deviceObj.brandId).then((brand) => {
        setBrandName(brand.name);
      });
    });
  }, [device.id]);

  return (
    <Col
      className="d-flex align-items-center mt-3"
      onClick={() => navigate(`${ROUTE.DEVICE}/${device.id}`)}
    >
      <Card style={{ cursor: 'pointer' }}>
        <Image
          style={{ borderRadius: 'inherit' }}
          className="w-100"
          src={device.img.length ? process.env.REACT_APP_API_URL + device.img : noImage}
        />
        <div className="p-2">
          <div className="text-black-50">{brandName}</div>
          <div className="d-flex  justify-content-between">
            <div>{device.name}</div>
            <div className="d-flex align-items-center">
              <div>{device.rating}</div>
              <Image className="ms-1" width={20} height={20} src={star} />
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
