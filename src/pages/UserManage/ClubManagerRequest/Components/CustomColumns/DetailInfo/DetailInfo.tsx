import { EyeOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import RequestInfo from 'pages/UserManage/ClubManagerRequest/Components/CustomColumns/RequestInfo/RequestInfo';
import useBooleanState from 'utils/hooks/useBoolean';

interface DetailInfoProps {
  name: string;
}

export default function DetailInfo({ name }: DetailInfoProps) {
  const {
    setTrue: openDrawer,
    value: isDrawerOpen,
    setFalse: closeDrawer,
  } = useBooleanState();

  return (
    <>
      <Button
        size="middle"
        icon={<EyeOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          openDrawer();
        }}
      >
        확인
      </Button>
      <Drawer
        title="동아리 상세정보"
        width={800}
        closable={{ 'aria-label': 'Close Button' }}
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <RequestInfo name={name} />
      </Drawer>
    </>

  );
}
