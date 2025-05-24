import { useState } from 'react';
import { useGetAcceptedClubListQuery } from 'store/api/clubRequest';
import CustomTable from 'components/common/CustomTable';
import * as S from './ClubManagerList.style';

export default function ClubManagerList() {
  const [page, setPage] = useState(1);
  const { data: ClubManagerRes } = useGetAcceptedClubListQuery({ page });

  const transformedRes = ClubManagerRes && {
    ...ClubManagerRes,
    clubs: ClubManagerRes.clubs.map((club, index) => {
      const { club_id: clubId, ...rest } = club;
      return {
        id: index + 1,
        ...rest,
      };
    }),
  };

  return (
    <S.Container>
      <S.Heading>동아리 관리자</S.Heading>
      {transformedRes && (
      <CustomTable
        data={transformedRes.clubs}
        pagination={{
          current: page,
          onChange: setPage,
          total: transformedRes.total_page,
        }}
        columnSize={[10, 25, 15, 25, 25]}
        onClick={() => { }}
      />
      )}
    </S.Container>
  );
}
