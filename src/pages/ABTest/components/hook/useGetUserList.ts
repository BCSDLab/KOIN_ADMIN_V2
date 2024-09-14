/* eslint-disable react-hooks/rules-of-hooks */
import { useGetUserByNameQuery, useGetUserByIDQuery } from 'store/api/abtest';

interface UseGetUserListQueryProps {
  name?: string;
  id?: string | number;
}

const useGetUserListQuery = ({ name, id }: UseGetUserListQueryProps) => {
  let data;
  let error;
  let isLoading;

  if (name) {
    const result = useGetUserByNameQuery(name);
    data = result.data;
    error = result.error;
    isLoading = result.isLoading;
  } else if (id) {
    const result = useGetUserByIDQuery(id);
    data = result.data;
    error = result.error;
    isLoading = result.isLoading;
  } else {
    data = undefined;
    error = 'name 또는 id 중 하나를 제공해야 합니다.';
    isLoading = false;
  }

  return { data, error, isLoading };
};

export default useGetUserListQuery;
