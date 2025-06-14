import { useState } from 'react';
import { useGetAcceptedClubListQuery } from 'store/api/clubRequest';
import CustomTable from 'components/common/CustomTable';
import * as S from './ClubManagerList.style';

export default function ClubManagerList() {
  const [page, setPage] = useState(1);
  const { data: clubManagerRes } = useGetAcceptedClubListQuery({ page });

  const transformedRes = clubManagerRes && {
    ...clubManagerRes,
    clubs: clubManagerRes.clubs.map((club) => {
      const { index, club_id: clubId, ...rest } = club;
      return {
        id: index,
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
        columnSize={[5, 15, 15, 15, 15, 25]}
        onClick={() => { }}
      />
      )}
    </S.Container>
  );
}
