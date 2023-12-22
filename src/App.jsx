import { BrowserRouter } from 'react-router-dom';

import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'


function App() {

  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  )
}

export default App;
