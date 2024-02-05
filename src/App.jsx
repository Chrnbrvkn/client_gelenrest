import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import './assets/styles/reset.css'
import './assets/styles/index.css'
import DataProvider from './contexts/DataProvider';
import ApiProvider from './contexts/ApiProvider';
import AdminProvider from './contexts/AdminProvider';
import BookingProvider from './contexts/BookingProvider';


export default function App() {



  return (
    <DataProvider>
      <ApiProvider>
        <BookingProvider>
          <AdminProvider>
            <BrowserRouter>
              <MainRoutes />
            </BrowserRouter>
          </AdminProvider>
        </BookingProvider>
      </ApiProvider>
    </DataProvider>
  )
}
