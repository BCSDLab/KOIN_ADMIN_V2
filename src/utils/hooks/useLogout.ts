import { setCredentials } from 'store/slice/auth';

export default function useLogout() {
  const logout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setCredentials({ token: '' });
    window.location.href = '/login';
  };
  return logout;
}
