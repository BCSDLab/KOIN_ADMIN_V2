import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import * as S from './ClubManagerList.style';

const ClubManagerRes = {
  total_count: 4,
  current_count: 10,
  total_page: 2,
  current_page: 1,
  clubs: [
    {
      id: 1,
      club_manager_name: '고효석',
      phone_number: '010-1234-5678',
      created_at: '2025-04-28',
      club_name: 'BCSD',
    },
  ],
};

export default function ClubManagerList() {
  const [page, setPage] = useState(1);

  return (
    <S.Container>
      <S.Heading>동아리 관리자</S.Heading>
      <CustomTable
        data={ClubManagerRes.clubs}
        pagination={{
          current: page,
          onChange: setPage,
          total: ClubManagerRes.total_page,
        }}
        columnSize={[10, 25, 15, 25, 25]}
        onClick={() => { }}
      />
    </S.Container>
  );
}
