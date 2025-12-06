import { Dropdown, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ProgressType, Semester } from 'model/bus.model';

interface SemesterDropdownType {
  semester: Semester | undefined;
  setSemester: (semester: Semester) => void;
  setProgress: (progress: ProgressType) => void;
}

const SEMESTER_LABEL: Record<Semester, string> = {
  REGULAR: '정규학기',
  SEASONAL: '계절학기',
  VACATION: '방학',
} as const;

const SEMESTER_ITEMS: MenuProps['items'] = (
  Object.entries(SEMESTER_LABEL) as [Semester, string][]
).map(([value, label]) => ({
  key: value,
  label,
}));

function BusSemesterDropdown({ semester, setSemester, setProgress }: SemesterDropdownType) {
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSemester(key as Semester);
    setProgress('selectedSemester');
  };

  return (
    <Dropdown
      menu={{ items: SEMESTER_ITEMS, onClick: handleMenuClick }}
      trigger={['click']}
    >
      <Button style={{ minWidth: '110px' }}>
        <Space>
          {semester ? SEMESTER_LABEL[semester] : '학기선택'}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default BusSemesterDropdown;
