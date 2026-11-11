import { queryOptions } from '@tanstack/react-query';
import { getDeliveryRequest, getDeliveryRequestList } from 'api/deliveryRequest';
import type { DeliveryRequestListResponse, DeliveryRequestsResponse } from 'model/deliveryRequest.model';

const deliveryRequestQueries = {
  allKeys: () => ['deliveryRequests'],

  deliveryRequestListKeys: (page: number) => [...deliveryRequestQueries.allKeys(), 'list', page],
  deliveryRequestList: (page: number) => queryOptions({
    queryKey: deliveryRequestQueries.deliveryRequestListKeys(page),
    queryFn: () => getDeliveryRequestList(page),
    select: (data: DeliveryRequestsResponse): DeliveryRequestListResponse => {
      const tableData = data.order_service_requests.map((request) => ({
        id: request.id,
        shop_id: request.shop_id,
        shop_name: request.shop_name,
        request_status: request.request_status,
        created_at: request.created_at,
      }));
      return { requests: tableData, totalPage: data.total_page };
    },
  }),

  deliveryRequestKeys: (id: number) => [...deliveryRequestQueries.allKeys(), 'detail', id],
  deliveryRequest: (id: number) => queryOptions({
    queryKey: deliveryRequestQueries.deliveryRequestKeys(id),
    queryFn: () => getDeliveryRequest(id),
  }),
};

export default deliveryRequestQueries;
