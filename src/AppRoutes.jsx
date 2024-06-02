import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/homePage/HomePage";
import Reserve from "./pages/reservePage/Reserve";
import Admin from "./pages/adminPage/Admin";
import NotFound from "./pages/notFoundPage/NotFound";
import Login from "./pages/loginPage/Login";
import House from "./pages/housesPage/House";
import Houses from "./pages/housesPage/Houses";
import Rooms from "./pages/roomPage/Rooms";
import Aparts from "./pages/apartsPage/Aparts";
import Apartament from "./pages/apartsPage/Apartment";
import PrivateRoute from "./pages/loginPage/PrivateRoute";
import TestPage from "./pages/testPage/TestPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="testPage" element={<TestPage />} />
        <Route path="houses" element={<Houses />} />
        <Route path="houses/:houseId" element={<House />} />
        <Route path="houses/:houseId/rooms/:roomId" element={<Rooms />} />
        <Route path="apartments" element={<Aparts />} />
        <Route path="apartments/:apartId" element={<Apartament />} />
        <Route path="reservation" element={<Reserve />} />
        <Route path="reservation/:type/:itemId" element={<Reserve />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<PrivateRoute element={<Admin />} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
