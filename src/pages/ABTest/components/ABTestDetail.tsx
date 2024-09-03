import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';

export default function ABTestDetail() {
  return (
    <>
      <Button icon={<PlusOutlined />}>수정</Button>
      <Divider orientation="left">세부사항</Divider>
      <Divider orientation="left">수동 인원 추가</Divider>
    </>
  );
}
