import { UpCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const RightDownButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 100px;
  font-size: 40px;
  cursor: pointer;
`;

export default function ScrollUpButton() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RightDownButton onClick={scrollUp}>
      <UpCircleOutlined />
    </RightDownButton>
  );
}
