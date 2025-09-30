import { queryOptions } from '@tanstack/react-query';
import { getOwnerRequest, getOwnerRequestList } from 'api/ownerRequest';
import type { OwnerRequestListResponse, OwnersResponse } from 'model/owner.model';

const ownerRequestQueries = {
  allkeys: () => ['ownerRequests'] as const,

  ownerRequestKeys: (id: number) => [...ownerRequestQueries.allkeys(), id] as const,
  ownerRequest: (id: number) => queryOptions({
    queryKey: ownerRequestQueries.ownerRequestKeys(id),
    queryFn: () => getOwnerRequest(id),
  }),

  ownerRequestListKeys: (page: number) => [...ownerRequestQueries.allkeys(), page] as const,
  ownerRequestList: (page: number) => queryOptions({
    queryKey: ownerRequestQueries.ownerRequestListKeys(page),
    queryFn: () => getOwnerRequestList(page),
    select: (data: OwnersResponse) : OwnerRequestListResponse => {
      const tableHeaders = data.owners.map((owner) => {
        return {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          created_at: owner.created_at,
          shop_name: owner.shop_name,
        };
      });
      return { owners: tableHeaders, totalPage: data.total_page };
    },
  }),
};

export default ownerRequestQueries;
