import { useDecidePendingClubMutation } from 'store/api/clubRequest';

export default function useClubManagerRequestMutation() {
  const [decidePendingClubMutation] = useDecidePendingClubMutation();

  const decidePendingClub = (
    club_name: string,
    is_accept: boolean,
    { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    decidePendingClubMutation({ club_name, is_accept })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
      });
  };

  return {
    decidePendingClub,
  };
}
