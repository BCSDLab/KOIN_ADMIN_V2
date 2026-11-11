import accessClient from 'api';
import type {
  DeliveryRequestDetail,
  DeliveryRequestProcessBody,
  DeliveryRequestsResponse,
} from 'model/deliveryRequest.model';

const BASE_URL = 'admin/owner/shops/order-service-requests';

export const getDeliveryRequestList = async (page: number) => {
  const response = await accessClient.get<DeliveryRequestsResponse>(BASE_URL, {
    params: { page, limit: 10, sort: 'CREATED_AT_DESC' },
  });
  return response.data;
};

export const getDeliveryRequest = async (id: number) => {
  const response = await accessClient.get<DeliveryRequestDetail>(`${BASE_URL}/${id}`);
  return response.data;
};

export const processDeliveryRequest = async (id: number, body: DeliveryRequestProcessBody) => {
  await accessClient.post(`${BASE_URL}/${id}/process`, body);
};
