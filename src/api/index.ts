import axios from 'axios';

/**
 * axois instance with access token
 */
const accessClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}`,
  timeout: 100000,
  withCredentials: true,
});

accessClient.interceptors.request.use((config) => {
  // TODO: Use cookies instead of sessionStorage for better security
  const accessToken = sessionStorage.getItem('token');
  const { headers } = config;

  if (headers && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default accessClient;
