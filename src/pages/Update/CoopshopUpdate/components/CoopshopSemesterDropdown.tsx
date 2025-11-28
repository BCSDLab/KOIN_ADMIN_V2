import { useQuery } from '@tanstack/react-query';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ProgressType } from 'model/bus.model';
import type { SemesterInfo } from 'model/coopshop.model';
import coopshopQueries from 'queryFactory/coopshopQueries';

interface CoopshopSemesterDropdownType {
  semester: SemesterInfo | null;
  setSemester: (semester: SemesterInfo | null) => void;
  setIsModalOpen: (event: boolean) => void;
  setProgress: (progress: ProgressType) => void;
}

function CoopshopSemesterDropdown({
  semester, setSemester, setIsModalOpen, setProgress,
}: CoopshopSemesterDropdownType) {
  const { data: coopshopSemesterList } = useQuery(coopshopQueries.coopshopSemesterList());

  const semesters: MenuProps['items'] = coopshopSemesterList?.map((coopshopSemester, index) => ({
    label: coopshopSemester.semester,
    key: index,
    onClick: () => {
      setSemester({
        sememsterName: coopshopSemester.semester,
        semesterId: coopshopSemester.id,
      });
      setProgress('selectedSemester');
    },
  }));

  const addSemester = {
    label: '학기 추가하기',
    key: 'add-Semester',
    onClick: () => {
      setIsModalOpen(true);
    },
  };

  const divider = {
    type: 'divider',
  } as const;

  const items = [...(semesters || []), divider, addSemester];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button style={{ minWidth: '180px' }}>
        <Space>
          {semester?.sememsterName || '학기선택'}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default CoopshopSemesterDropdown;
