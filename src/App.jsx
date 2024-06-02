import './assets/styles/reset.css'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import DataProvider from './contexts/DataProvider';
import ApiProvider from './contexts/ApiProvider';
import ModalsProvider from './contexts/ModalsProvider';

export default function App() {


  return (
    <DataProvider>
      <ApiProvider>
        <ModalsProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ModalsProvider>
      </ApiProvider>
    </DataProvider>
  )
}