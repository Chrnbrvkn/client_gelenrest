import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'
import DataProvider from './contexts/DataProvider';
import ApiProvider from './contexts/ApiProvider';
import ModalsProvider from './contexts/ModalsProvider';


export default function App() {



  return (
    <DataProvider>
      <ApiProvider>
        <ModalsProvider>
            <BrowserRouter>
              <MainRoutes />
            </BrowserRouter>
        </ModalsProvider>
      </ApiProvider>
    </DataProvider>
  )
}
