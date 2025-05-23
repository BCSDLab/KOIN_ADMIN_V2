import type { ColumnType } from 'antd/es/table';
import ClubManagerList from 'pages/Services/Club/Components/CustomColumns/ClubManagerList/ClubManagerList';
import ClubActiveSwitch from 'pages/Services/Club/Components/CustomColumns/ClubActiveSwitch/ClubActiveSwitch';

interface Club {
  id: number;
  is_active: boolean;
}

interface Props {
  toggleClubActive: (id: number, checked: boolean) => void;
}

export default function CustomClubColumns({ toggleClubActive }: Props): ColumnType<Club>[] {
  return [
    {
      title: '활성화 여부',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (value, record) => (
        <ClubActiveSwitch
          id={record.id}
          isActive={value}
          onToggle={toggleClubActive}
        />
      ),
    },
    {
      title: '관리자',
      dataIndex: 'club_managers',
      key: 'club_managers',
      render: (managers) => <ClubManagerList managers={managers} />,
    },

  ];
}
