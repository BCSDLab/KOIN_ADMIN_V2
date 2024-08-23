import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 30px;
  position: relative;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const RightDownButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 100px;
  font-size: 40px;
  cursor: pointer;
`;
