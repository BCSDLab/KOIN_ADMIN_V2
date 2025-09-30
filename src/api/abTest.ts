import accessClient from 'api';
import type {
  ABTest,
  ABTestResponse,
  NewABTestResponse,
  ModifyABTest,
  ABTestUserMoveRequest,
  ABTestWinnerRequest,
  ABTestAssignRequest,
} from 'model/abTest.model';

export const getABTests = async (page: number, limit: number) => {
  const { data } = await accessClient.get<ABTestResponse>('/abtest', {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getABTest = async (id: number) => {
  const { data } = await accessClient.get(`/abtest/${id}`);
  return data;
};

export const addABTest = async (data: Partial<ABTest>) => {
  const { data: resData } = await accessClient.post<NewABTestResponse>('/abtest', data);
  return resData;
};

export const putABTest = async ({ id, data }: Partial<ModifyABTest>) => {
  const { data: resData } = await accessClient.put(`/abtest/${id}`, data);
  return resData;
};

export const deleteABTest = async (id : string) => {
  const { data: resData } = await accessClient.delete(`/abtest/${id}`);
  return resData;
};

export const getUserByName = async (name: string) => {
  const { data: resData } = await accessClient.get('/abtest/user', {
    params: {
      name,
    },
  });
  return resData;
};

export const getUserByID = async (id: number | string) => {
  const { data: resData } = await accessClient.get(`/abtest/user/${id}/device`);
  return resData;
};

export const moveUser = async (data: ABTestUserMoveRequest) => {
  const { data: resData } = await accessClient.post(`/abtest/${data.id}/move`, data.data);
  return resData;
};

export const postWinner = async (data: ABTestWinnerRequest) => {
  const { data: resData } = await accessClient.post(`/abtest/close/${data.id}`, { winner_name: data.winner_name });
  return resData;
};

// 미사용 API
export const getFirstMyPage = async (data: ABTestAssignRequest) => {
  const { data: resData } = await accessClient.get('/abtest/assign', {
    headers: {
      access_history_id: `${data.access_history_id}`,
    },
  });
  return resData;
};

// 미사용 API
export const getMyPage = async (data: ABTestAssignRequest) => {
  const { data: resData } = await accessClient.get('/abtest/me', {
    headers: {
      access_history_id: `${data.access_history_id}`,
    },
  });
  return resData;
};
