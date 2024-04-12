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
import { logout } from './store/features/auth/authSlice';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenExpiration = localStorage.getItem('jwtTokenExpiration');
    const now = new Date().getTime();


    // const token = localStorage.getItem('jwtToken');
    if (tokenExpiration && now < Number(tokenExpiration)) {
      dispatch(validateTokenAsync());
    } else {
      dispatch(logout())
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenExpiration');
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
