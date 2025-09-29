import { queryOptions } from '@tanstack/react-query';
import { getOwner, getOwnerList } from 'api/owner';
import { OwnerListResponse, OwnersResponse, OwnersParam } from 'model/owner.model';

export const ownerQueries = {
  allKeys: () => ['owners'] as const,
  ownerKeys: (id: number) => [...ownerQueries.allKeys(), id] as const,
  owner: (id: number) => queryOptions({
    queryKey: ownerQueries.ownerKeys(id),
    queryFn: () => getOwner(id),
  }),
  ownerListKeys: (param: OwnersParam) => [...ownerQueries.allKeys(), param],
  ownerList: (param : OwnersParam) => queryOptions({
    queryKey: ownerQueries.ownerListKeys(param),
    queryFn: () => getOwnerList(param),
    select: (data : OwnersResponse):OwnerListResponse => {
      const tableHeaders = data.owners.map((owner) => {
        return {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          created_at: owner.created_at,
          phone_number: owner.phone_number,
        };
      });

      return { owners: tableHeaders, totalPage: data.total_page };
    },
  }),
};

export default ownerQueries;
