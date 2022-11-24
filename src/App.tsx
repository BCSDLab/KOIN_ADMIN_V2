import Toast from 'components/common/Toast';
import DefaultLayout from 'layout/defaultLayout';
import Bus from 'pages/Services/Bus';
import Cafeteria from 'pages/Services/Cafeteria';
import Category from 'pages/Services/Category';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Manager from 'pages/UserManage/Manager';
import ManagerRequest from 'pages/UserManage/ManagerRequest';
import Member from 'pages/UserManage/Member';
import Store from 'pages/Services/Store';
import UserList from 'pages/UserManage/User/UserList';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import { RootState } from 'store';
import UserDetail from 'pages/UserManage/User/UserDetail';
import RoomList from 'pages/Services/Room/RoomList';
import RoomDetail from 'pages/Services/Room/RoomDetail';

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
          <Route path="/room" element={<RoomList />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/manager-request" element={<ManagerRequest />} />
          <Route path="/member" element={<Member />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
