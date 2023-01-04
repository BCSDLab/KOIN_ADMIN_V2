import styled from 'styled-components';

export const Tab = styled.button<{ selected: boolean }>`
  appearance: none;
  background: none;
  border: none;
  position: relative;
  padding-bottom: 10px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    border-color: blue;
    border-style: solid;
    border-width: 0 0 ${({ selected }) => (selected ? '3px' : '0')} 0;
    width: ${({ selected }) => (selected ? '100%' : '0')};
    transition: 0.4s;
  }
`;

export const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 20px;
`;

export const CardList = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
