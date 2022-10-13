import Toast from 'components/common/Toast';
import DefaultLayout from 'layout/defaultLayout';
import Bus from 'pages/Bus';
import Cafeteria from 'pages/Cafeteria';
import Category from 'pages/Category';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Manager from 'pages/Manager';
import ManagerRequest from 'pages/ManagerRequest';
import Room from 'pages/Room';
import Store from 'pages/Store';
import User from 'pages/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import { RootState } from 'store';

function RequireAuth({ children }: { children: ReactNode }) {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{ children }</>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><DefaultLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cafeteria" element={<Cafeteria />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/room" element={<Room />} />
          <Route path="/user" element={<User />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/manager-request" element={<ManagerRequest />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
