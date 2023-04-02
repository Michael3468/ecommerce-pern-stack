import { FC } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import noImage from '../assets/images/no-image.png';
import star from '../assets/images/star.svg';
import { IDevice } from '../types';
import { DEVICE_ROUTE } from '../utils/constants';

interface IDeviceItemProps {
  device: IDevice;
}

const DeviceItem: FC<IDeviceItemProps> = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      className="d-flex align-items-center mt-3"
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ cursor: 'pointer', borderColor: '#d2d0f4' }}>
        <Image
          style={{ borderRadius: 'inherit' }}
          width="100%"
          src={device.img.length ? device.img : noImage}
        />
        <div className="p-2">
          <div className="text-black-50">Samsung</div>
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
