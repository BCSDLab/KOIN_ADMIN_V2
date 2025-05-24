import type { ColumnType } from 'antd/es/table';
import AcceptModal from 'pages/UserManage/ClubManagerRequest/Components/CustomColumns/AcceptModal/AcceptModal';
import DetailInfo from 'pages/UserManage/ClubManagerRequest/Components/CustomColumns/DetailInfo/DetailInfo';

interface ClubManagerRequestList {
  id: number;
  club_name: string;
  is_accept: boolean;
  info: boolean;
}

export default function CustomClubManagerColumns(): ColumnType<ClubManagerRequestList>[] {
  return [
    {
      key: 'is_accept',
      dataIndex: 'is_accept',
      title: '승인/반려',
      render: (_, record) => <AcceptModal club_name={record.club_name} />,
    },
    {
      key: 'info',
      dataIndex: 'info',
      title: '정보보기',
      render: (_, record) => <DetailInfo name={record.club_name} />,
    },
  ];
}
