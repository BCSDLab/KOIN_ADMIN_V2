import type { ColumnType } from 'antd/es/table';
import AcceptModal from 'pages/UserManage/ClubManagerRequest/Components/CustomColumns/AcceptModal/AcceptModal';
import DetailInfo from 'pages/UserManage/ClubManagerRequest/Components/CustomColumns/DetailInfo/DetailInfo';

interface ClubManagerRequestList {
  id: number;
  is_active: boolean;
  info: boolean;
}

export default function CustomClubManagerColumns(): ColumnType<ClubManagerRequestList>[] {
  return [
    {
      key: 'is_active',
      dataIndex: 'is_active',
      title: '승인/반려',
      render: () => <AcceptModal />,
    },
    {
      key: 'info',
      dataIndex: 'info',
      title: '정보보기',
      render: () => <DetailInfo />,
    },
  ];
}
