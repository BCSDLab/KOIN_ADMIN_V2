import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetPendingClubListQuery } from 'store/api/clubRequest';
import customColumns from './Components/CustomColumns/CustomColumns';
import * as S from './ClubManagerRequestList.style';

export default function ClubManagerList() {
  const [page, setPage] = useState(1);
  const { data: clubManagerRes } = useGetPendingClubListQuery({ page });

  const transformedRes = clubManagerRes && {
    ...clubManagerRes,
    clubs: clubManagerRes.clubs.map((club, index) => {
      const { club_id: clubId, ...rest } = club;
      return {
        id: index + 1,
        ...rest,
        is_accept: true,
        info: true,
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
        columnSize={[10, 10, 15, 15, 15, 15, 20]}
        onClick={() => { }}
        columns={customColumns()}
      />
      )}
    </S.Container>
  );
}
