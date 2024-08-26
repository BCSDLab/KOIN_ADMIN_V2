import styled from 'styled-components';

export const Shortcut = styled.a`
  color: '#cacaca';
  text-decoration: none;
`;

export const Container = styled.div<{ isHandle: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  background: ${(props) => (props.isHandle ? '#ff000050' : '#00BFFF10')};
  border-radius: 10px;
  transition: scale 0.3s, height 0.3s;
  width: 100%;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RowItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Item = styled.div`
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
`;

export const MenuImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

export const AroundRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
