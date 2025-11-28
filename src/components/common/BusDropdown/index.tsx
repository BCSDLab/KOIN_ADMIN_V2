import { Dropdown, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ProgressType, Semester } from 'model/bus.model';

interface SemesterDropdownType {
  semester: Semester | null;
  setSemester: (semester: Semester) => void;
  setProgress: (progress: ProgressType) => void;
}

const SEMESTAR_LABEL: Record<Semester, string> = {
  REGULAR: '정규학기',
  SEASONAL: '계절학기',
  VACATION: '방학',
} as const;

function BusSemesterDropdown({ semester, setSemester, setProgress }: SemesterDropdownType) {
  const items: MenuProps['items'] = [
    {
      label: '정규학기',
      key: '0',
      onClick: () => {
        setSemester('REGULAR');
        setProgress('selectedSemester');
      },
    },
    {
      label: '계절학기',
      key: '1',
      onClick: () => {
        setSemester('SEASONAL');
        setProgress('selectedSemester');
      },
    },
    {
      label: '방학',
      key: '2',
      onClick: () => {
        setSemester('VACATION');
        setProgress('selectedSemester');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button style={{ minWidth: '110px' }}>
        <Space>
          {!semester && '학기선택'}
          {semester && SEMESTAR_LABEL[semester]}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default BusSemesterDropdown;
