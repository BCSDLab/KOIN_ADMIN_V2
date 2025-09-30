import { queryOptions } from '@tanstack/react-query';
import { getUser, getUserList } from 'api/user';
import type { UserListResponseType, UsersResponse } from 'model/user.model';

const userQueries = {
  allKeys: () => ['users'] as const,

  userKeys: (id: number) => [...userQueries.allKeys(), id] as const,
  user: (id: number) => queryOptions({
    queryKey: userQueries.userKeys(id),
    queryFn: () => getUser(id),
  }),

  userListKeys: (page: number) => [...userQueries.allKeys(), page] as const,
  userList: (page: number) => queryOptions({
    queryKey: userQueries.userListKeys(page),
    queryFn: () => getUserList(page),
    select: (data: UsersResponse) : UserListResponseType => ({
      students: data.students,
      totalPage: data.total_page,
    }),
  }),

};

export default userQueries;
