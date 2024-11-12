import { setCredentials } from 'store/slice/auth';

export default function useLogout() {
  const logout = () => {
    setCredentials({ token: '' });
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };
  return logout;
}
