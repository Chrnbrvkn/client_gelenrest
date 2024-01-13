import { BrowserRouter } from 'react-router-dom';


import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'
import DataProvider from './contexts/DataProvider';
import HousesProvider from './contexts/HousesProvider';
import ApartsProvider from './contexts/ApartsProvider';


function App() {

  return (
    <DataProvider>
      <HousesProvider>
        <ApartsProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </ApartsProvider>
      </HousesProvider>
    </DataProvider>
  )
}

export default App;
