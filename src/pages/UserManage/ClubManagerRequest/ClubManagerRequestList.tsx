import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import customColumns from './Components/CustomColumns/CustomColumns';
import * as S from './ClubManagerRequestList.style';

const clubManagerRes = {
  total_count: 57,
  current_count: 10,
  total_page: 6,
  current_page: 2,
  clubs: [
    {
      id: 1,
      club_manager_name: '배진호',
      phone_number: '01024607469',
      created_at: '2025-05-19',
      club_name: 'BCSD',
      is_active: true,
      info: true,
    },
  ],
};

export default function ClubManagerList() {
  const [page, setPage] = useState(1);

  const enrichedData = clubManagerRes.clubs.map((club) => ({
    ...club,
    is_active: true,
    info: true,
  }));

  return (
    <S.Container>
      <S.Heading>동아리 관리자</S.Heading>
      <CustomTable
        data={enrichedData}
        pagination={{
          current: page,
          onChange: setPage,
          total: clubManagerRes.total_page,
        }}
        columnSize={[10, 10, 15, 15, 15, 15, 20]}
        onClick={() => { }}
        columns={customColumns()}
      />
    </S.Container>
  );
}
