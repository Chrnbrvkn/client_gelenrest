import './assets/styles/reset.css'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import DataProvider from './contexts/DataProvider';
import ApiProvider from './contexts/ApiProvider';
import ModalsProvider from './contexts/ModalsProvider';

import { useDispatch } from 'react-redux';
import { validateTokenAsync } from './store/features/auth/authThunk';
import { useEffect } from 'react';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      dispatch(validateTokenAsync());
    }
  }, [dispatch]);


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