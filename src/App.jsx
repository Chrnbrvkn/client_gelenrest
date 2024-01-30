import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'
import DataProvider from './contexts/DataProvider';
import ApiProvider from './contexts/ApiProvider';


export default function App() {



  return (
    <DataProvider>
        <ApiProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </ApiProvider>
    </DataProvider>
  )
}
