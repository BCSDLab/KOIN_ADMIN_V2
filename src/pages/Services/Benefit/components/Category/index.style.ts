import { styled } from 'styled-components';

export const Box = styled.button<{ isclicked: boolean }>`
  width: 150px;
  height: 100px;
  border: ${(props) => (props.isclicked ? '4px solid rgba(129, 173, 255, 0.8)' : '1px solid #ddd')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: scale 0.2s;
  background: #fff;

  &:active {
    scale: 0.95;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center
`;
