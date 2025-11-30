import { useQuery } from '@tanstack/react-query';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ProgressType } from 'model/bus.model';
import type { SemesterInfo } from 'model/coopShop.model';
import coopShopQueries from 'queryFactory/coopShopQueries';

interface CoopShopSemesterDropdownType {
  semester: SemesterInfo | undefined;
  setSemester: (semester: SemesterInfo | undefined) => void;
  setIsModalOpen: (event: boolean) => void;
  setProgress: (progress: ProgressType) => void;
}

function CoopShopSemesterDropdown({
  semester, setSemester, setIsModalOpen, setProgress,
}: CoopShopSemesterDropdownType) {
  const { data: coopShopSemesterList } = useQuery(coopShopQueries.coopShopSemesterList());

  const semesters: MenuProps['items'] = coopShopSemesterList?.map((coopShopSemester, index) => ({
    label: coopShopSemester.semester,
    key: index,
    onClick: () => {
      setSemester({
        sememsterName: coopShopSemester.semester,
        semesterId: coopShopSemester.id,
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

export default CoopShopSemesterDropdown;
