import DefaultLayout from 'layout/defaultLayout';
import Bus from 'pages/Services/Bus';
import Cafeteria from 'pages/Services/Cafeteria';
import Category from 'pages/Services/Category';
import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import Manager from 'pages/UserManage/Manager';
import ManagerRequest from 'pages/UserManage/ManagerRequest';
import MemberList from 'pages/UserManage/Member/MemberList';
import Store from 'pages/Services/Store/StoreList';
import UserList from 'pages/UserManage/User/UserList';
import {
  Navigate, Outlet, Route, Routes, useLocation,
} from 'react-router-dom';
import UserDetail from 'pages/UserManage/User/UserDetail';
import RoomList from 'pages/Services/Room/RoomList';
import RoomDetail from 'pages/Services/Room/RoomDetail';
import MemberDetail from 'pages/UserManage/Member/MemberDetail';
import { useToken } from 'store/slice/auth';
import StoreDetail from 'pages/Services/Store/StoreDetail';

function RequireAuth() {
  const location = useLocation();
  const token = useToken();

  if (token === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<Dashboard />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cafeteria" element={<Cafeteria />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/room" element={<RoomList />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/manager-request" element={<ManagerRequest />} />
        <Route path="/member" element={<MemberList />} />
        <Route path="/member/:id" element={<MemberDetail />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
