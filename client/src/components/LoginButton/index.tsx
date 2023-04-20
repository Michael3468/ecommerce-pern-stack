import { Button } from 'react-bootstrap';
import { IoMdLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { ROUTE, mainTheme } from '../../constants';
import styles from './index.module.scss';

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline-light" className="ms-2 border-0" onClick={() => navigate(ROUTE.LOGIN)}>
      <IoMdLogIn className={`${styles.icon}`} style={{ fontSize: mainTheme.navbarIcon.size }} />
      <span className={`${styles.text}`}>Log In</span>
    </Button>
  );
};

export default LoginButton;
