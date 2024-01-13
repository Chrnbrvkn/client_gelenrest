import { BrowserRouter } from 'react-router-dom';


import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'
import DataProvider from './components/DataProvider';



function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App;
