import { queryOptions } from '@tanstack/react-query';
import { getMember, getMemberList } from 'api/member';
import type { MembersParam, GetMemberResponse, MembersResponse } from 'model/member.model';

const memberQueries = {
  allKeys: () => ['members'],

  memberListKeys: ({
    page,
    track,
    is_deleted,
  }: MembersParam) => [...memberQueries.allKeys(), {
    page, track, is_deleted,
  }],
  memberList: (param: MembersParam) => queryOptions({
    queryKey: memberQueries.memberListKeys(param),
    queryFn: () => getMemberList(param),
    select: (data : MembersResponse) : GetMemberResponse => ({
      memberList: data.members,
      totalPage: data.total_page,
    }),
  }),

  memberKeys: (id: number) => [...memberQueries.allKeys(), id],
  member: (id: number) => queryOptions({
    queryKey: memberQueries.memberKeys(id),
    queryFn: () => getMember(id),
  }),
};

export default memberQueries;
