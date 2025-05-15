import { Switch } from 'antd';
import type { ColumnType } from 'antd/es/table';

type Club = {
  id: number;
  is_active: boolean;
};

export default function CustomClubColumn() : ColumnType<Club>[] {
  return [
    {
      title: '활성화 여부',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (value: boolean, record: Club) => (
        <Switch
          checked={value}
          onClick={(_, event) => event.stopPropagation()}
          onChange={(checked) => {
            console.log('Toggle active status for club ID:', record.id, 'to', checked);
          }}
        />
      ),
    }];
}
