import { skipToken, queryOptions } from '@tanstack/react-query';
import { getClub, getClubList } from 'api/club';

const clubQueries = {
  allKey: () => ['club'],

  clubKey: (id: number) => [...clubQueries.allKey(), id],
  club: (id: number) => queryOptions({
    queryKey: clubQueries.clubKey(id),
    queryFn: id ? () => getClub(id) : skipToken,
  }),

  clubListKey: (page: number, categoryId: number | undefined) => (categoryId !== undefined ? ['club', page, categoryId] : ['club', page]),
  clubList: (page: number, club_category_id: number | undefined) => queryOptions({
    queryKey: clubQueries.clubListKey(page, club_category_id),
    queryFn: () => getClubList({ page, club_category_id }),
  }),
};

export default clubQueries;
