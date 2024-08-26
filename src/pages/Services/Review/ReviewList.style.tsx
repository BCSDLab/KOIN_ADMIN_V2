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
  margin-bottom: 30px;
`;
