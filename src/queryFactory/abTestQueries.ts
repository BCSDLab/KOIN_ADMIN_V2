import { queryOptions } from '@tanstack/react-query';
import {
  getABTest, getABTests, getUserByID, getUserByName,
} from 'api/abTest';

const abTestQueries = {
  allKey: () => ['abTest'],

  abTestsKey: (page: number, limit: number) => [...abTestQueries.allKey(), page, limit],
  abTests: (page: number, limit: number) => queryOptions({
    queryKey: abTestQueries.abTestsKey(page, limit),
    queryFn: () => getABTests(page, limit),
  }),

  abTestKey: (id: number) => [...abTestQueries.allKey(), id],
  abTest: (id: number) => queryOptions({
    queryKey: abTestQueries.abTestKey(id),
    queryFn: () => getABTest(id),
  }),

  userNameKey: (name: string) => [...abTestQueries.allKey(), 'user', name],
  userName: (name: string) => queryOptions({
    queryKey: abTestQueries.userNameKey(name),
    queryFn: () => getUserByName(name),
  }),

  userIDKey: (id: number | string) => [...abTestQueries.allKey(), 'user', id],
  userID: (id: number | string) => queryOptions({
    queryKey: abTestQueries.userIDKey(id),
    queryFn: () => getUserByID(id),
    enabled: !!id,
  }),
};

export default abTestQueries;
