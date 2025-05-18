import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Select } from 'antd';
import CustomTable from 'components/common/CustomTable';
import CLUB_OPTION from 'constant/club';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ClubList.style';
import CustomClubColumn from './Components/CustomColumn/CustomColumn';

const ClubRes = {
  total_page: 2,
  clubs: [
    {
      id: 1,
      title: 'BCSD',
      image: 'https://placehold.co/600x400',
      manager_name: '홍길동',
      manager_email: 'bcsd@example.com',
      category: '학술분과',
      created_at: '2025-04-28',
      is_active: true,
    },
    {
      id: 2,
      title: '그라피토',
      image: 'https://placehold.co/600x400',
      manager_name: '김유신',
      manager_email: 'graphito@example.com',
      category: '취미분과',
      created_at: '2025-04-28',
      is_active: true,
    },
    {
      id: 3,
      title: 'LPB',
      image: 'https://placehold.co/600x400',
      manager_name: '이순신',
      manager_email: 'lpb@example.com',
      category: '운동분과',
      created_at: '2025-04-28',
      is_active: true,
    },
    {
      id: 4,
      title: 'CodeUp',
      image: 'https://placehold.co/600x400',
      manager_name: '강감찬',
      manager_email: 'codeup@example.com',
      category: '학술분과',
      created_at: '2025-04-28',
      is_active: false,
    },
  ],
};

export default function ClubList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const columns = CustomClubColumn();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <S.Container>
      <S.Heading>동아리 관리</S.Heading>
      <Flex justify="end">
        <Select
          defaultValue={CLUB_OPTION[0].name}
          style={{ width: 120 }}
          options={CLUB_OPTION.map((option) => ({
            label: option.name,
            value: option.id,
          }))}
          onChange={handleChange}
        />
      </Flex>
      <CustomTable
        data={ClubRes.clubs}
        pagination={{
          current: page,
          onChange: setPage,
          total: ClubRes.total_page,
        }}
        columnSize={[5, 15, 15, 10, 20, 10, 15, 10]}
        columns={columns}
      />

      <Flex justify="end">
        <Button icon={<PlusOutlined />} onClick={() => navigate('/club/write')}>
          신규 동아리 생성
        </Button>
      </Flex>
    </S.Container>
  );
}
