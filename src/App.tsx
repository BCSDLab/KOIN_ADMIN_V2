import Login from 'pages/Login';
import { useSelector } from 'react-redux';
import {
  Navigate, Outlet, Route, Routes, useLocation,
} from 'react-router-dom';
import { RootState } from 'store';
import * as S from './App.style';

function RequireAuth() {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<S.Container>HOME</S.Container>} />
      </Route>
    </Routes>
  );
}

export default App;
