import { FC, useContext, useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from '../assets/styles/common.module.css';
import { fetchOneDevice } from '../http/deviceAPI';
import { StoreContext } from '../index';
import { IDevice, TDeviceData } from '../types';

type Props = {
  deviceId: number;
  deviceData: TDeviceData;
};

const CartItem: FC<Props> = ({ deviceId, deviceData }) => {
  const [device, setDevice] = useState<IDevice | null>(null);
  const [devicesInCart, setDevicesInCart] = useState<number>(deviceData.count);
  const { cartStore } = useContext(StoreContext);

  const updateDevicesCount = (devId: number) => {
    const devicesInCartStore = cartStore.userCart.get(devId) || null;
    const newCount = devicesInCartStore?.count ? devicesInCartStore.count : 0;
    setDevicesInCart(newCount);
  };

  const removeDevice = () => {
    cartStore.removeDeviceFromCart(deviceId, device?.price || 0);
    updateDevicesCount(deviceId);

    cartStore.saveCartToLocalStorage();
  };

  const addDevice = () => {
    cartStore.addDeviceToCart(deviceId, device?.price || 0);
    updateDevicesCount(deviceId);

    cartStore.saveCartToLocalStorage();
  };

  useEffect(() => {
    fetchOneDevice(deviceId)
      .then((dev) => setDevice(dev))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  }, [deviceId]);

  return (
    <Card className={`${styles.shadow} w-100 mt-3 ms-auto me-auto`} style={{ maxWidth: 700 }}>
      <Row className="p-3">
        <div className="d-flex justify-content-center justify-content-sm-between flex-column flex-sm-row">
          <img
            className="ms-auto me-auto"
            // TODO: 250 to constants
            style={{
              maxWidth: 250,
              maxHeight: 250,
              width: 250,
              height: 250,
              objectFit: 'contain',
              borderRadius: 5,
            }}
            src={`${process.env.REACT_APP_API_URL}${device?.img}`}
          />

          {/* TODO: move to separate component */}
          {/* price-and-count */}
          <div
            className="d-flex ms-auto me-auto flex-column justify-content-center align-items-center"
            style={{
              maxWidth: 250,
              maxHeight: 250,
              width: 250,
              height: 250,
            }}
          >
            <div>
              <Link
                to={`${process.env.REACT_APP_URL}device/${deviceId}`}
                style={{ color: 'black' }}
              >
                <h2 className={`text-center ${styles.text_shadow}`}>{device?.name}</h2>
              </Link>
              {/* TODO: add choose currency, constants */}
              <h4 className="text-center">
                {/* TODO: change '' to spinner */}
                {`Price: ${device?.price !== undefined ? device.price : ''} ₽`}
              </h4>
              <h5 className="mb-4 text-center">
                {`Total: ${device?.price !== undefined ? device.price * devicesInCart : ''} ₽`}
              </h5>
            </div>

            {/* TODO: add width/height variables */}
            <div className="d-flex justify-content-center">
              <div className="d-flex" style={{ width: 160 }}>
                <Button
                  className="justify-content-center"
                  style={{ width: 40, height: 40 }}
                  onClick={removeDevice}
                >
                  -
                </Button>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: 80, height: 40 }}
                >
                  {devicesInCart}
                </div>
                <Button style={{ width: 40, height: 40 }} onClick={addDevice}>
                  +
                </Button>
              </div>
            </div>
          </div>
          {/* price-and-count */}
        </div>
      </Row>
    </Card>
  );
};

export default CartItem;
