import { Button } from 'react-bootstrap';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { ROUTE, mainTheme } from '../../constants';
import styles from './index.module.scss';

const AdminPanelButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline-light" className="ms-2 border-0" onClick={() => navigate(ROUTE.ADMIN)}>
      <IoMdSettings className={`${styles.icon}`} style={{ fontSize: mainTheme.navbarIcon.size }} />
      <span className={`${styles.text}`}>Admin Panel</span>
    </Button>
  );
};

export default AdminPanelButton;
