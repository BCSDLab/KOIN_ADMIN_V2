import Toast from 'components/common/Toast';
import DefaultLayout from 'layout/defaultLayout';
import Login from 'pages/Login';
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
          <Route index element={<div>HOME</div>} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
