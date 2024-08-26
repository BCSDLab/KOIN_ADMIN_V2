import DefaultLayout from 'layout/defaultLayout';
import Bus from 'pages/Services/Bus';
import CategoryList from 'pages/Services/Category/CategoryList';
import Login from 'pages/Login';
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
import CategoryDetail from 'pages/Services/Category/CategoryDetail';
import OwnerList from 'pages/UserManage/Owner/OwnerList';
import OwnerRequestList from 'pages/UserManage/OwnerRequest/OwnerRequestList';
import OwnerRequestDetail from 'pages/UserManage/OwnerRequest/OwnerRequestDetail';
import OwnerDetail from 'pages/UserManage/Owner/OwnerDetail';
import ReviewList from 'pages/Services/Review/ReviewList';

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
        <Route index element={<Store />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<StoreDetail />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/room" element={<RoomList />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/owner" element={<OwnerList />} />
        <Route path="/owner/:id" element={<OwnerDetail />} />
        <Route path="/owner-request" element={<OwnerRequestList />} />
        <Route path="/owner-request/:id" element={<OwnerRequestDetail />} />
        <Route path="/member" element={<MemberList />} />
        <Route path="/member/:id" element={<MemberDetail />} />
        <Route path="/review" element={<ReviewList />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
