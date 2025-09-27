import { useState } from 'react';
import CustomTable from 'components/common/CustomTable';
import { useQuery } from '@tanstack/react-query';
import clubRequestQueries from 'queryFactory/clubRequestQueries';
import customColumns from './Components/CustomColumns/CustomColumns';
import * as S from './ClubManagerRequestList.style';

export default function ClubManagerList() {
  const [page, setPage] = useState(1);

  const { data: clubManagerRes } = useQuery(clubRequestQueries.pendingList({ page }));

  const transformedRes = clubManagerRes && {
    ...clubManagerRes,
    clubs: clubManagerRes.clubs.map((club) => {
      const { index, club_id: clubId, ...rest } = club;
      return {
        id: index,
        ...rest,
        is_accept: true,
        info: true,
      };
    }),
  };

  return (
    <S.TableContainer>
      <S.Heading>동아리 관리자</S.Heading>
      {transformedRes && (
      <CustomTable
        data={transformedRes.clubs}
        pagination={{
          current: page,
          onChange: setPage,
          total: transformedRes.total_page,
        }}
        columnSize={[5, 15, 10, 15, 10, 20, 15, 15]}
        onClick={() => { }}
        columns={customColumns()}
      />
      )}
    </S.TableContainer>
  );
}
