import { BrowserRouter } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import './App.css';

const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default App;
