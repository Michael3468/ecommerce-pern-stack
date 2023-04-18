import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdLogOut } from 'react-icons/io';

import { mainTheme } from '../../constants';
import { StoreContext } from '../../index';
import styles from './index.module.scss';

const LogoutButton = () => {
  const { userStore } = useContext(StoreContext);

  const handleLogOutButton = () => {
    userStore.setUser(null);
    userStore.setIsAuth(false);
  };

  return (
    <Button variant="outline-light" className="ms-2 border-0" onClick={handleLogOutButton}>
      <IoMdLogOut className={`${styles.icon}`} style={{ fontSize: mainTheme.navbarIcon.size }} />
      <span className={`${styles.text}`}>Logout</span>
    </Button>
  );
};

export default LogoutButton;
