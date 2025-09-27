import { useMutation, useQueryClient } from '@tanstack/react-query';
import { decidePendingClub } from 'api/clubRequest';
import clubRequestQueries from 'queryFactory/clubRequestQueries';

export default function useClubManagerRequestMutation() {
  const queryClient = useQueryClient();

  const decidePendingClubMutation = useMutation({
    mutationFn: (
      { club_name, is_accept }: { club_name: string; is_accept: boolean },
    ) => decidePendingClub({ club_name, is_accept }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubRequestQueries.allKey() });
    },
  });

  return { decidePendingClubMutation };
}
