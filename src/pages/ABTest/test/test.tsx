/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider } from 'antd';

// Set up axios instance with base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH, // Use the base URL from environment variables
});

export default function ABTestTest() {
  const accessHistoryId = Number(localStorage?.getItem('access_history_id'));
  const [myPage, setMyPage] = useState<{
    variable_name: string;
    access_history_id: number
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (accessHistoryId) {
          // Send `getMyPage` request
          response = await axiosInstance.get('/abtest/me', {
            headers: {
              access_history_id: accessHistoryId,
            },
            params: {
              title: 'sadf',
            },
          });
        } else {
          // Send `getFirstMyPage` request
          response = await axiosInstance.post('/abtest/assign', {
            title: 'sadf',
          });
        }
        setMyPage(response.data);
        localStorage.setItem('access_history_id', response.data.access_history_id);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Divider orientation="left">AB테스트의 테스트 페이지</Divider>
      <p>
        {accessHistoryId ? `로컬 스토리지 Access History ID: ${accessHistoryId}` : 'Access History ID가 없습니다.'}
      </p>

      {isLoading && <p>로딩 중...</p>}

      {error && (
      <p>
        에러 발생:
        {error}
      </p>
      )}

      {myPage && (
        <>
          <p>
            응답 받은 Variable Name:
            {myPage.variable_name}
          </p>
          <p>
            응답 받은 Access History ID:
            {myPage.access_history_id}
          </p>
        </>
      )}
    </>
  );
}
