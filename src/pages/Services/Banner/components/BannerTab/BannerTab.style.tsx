import styled from 'styled-components';

export const CategoryTabContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

export const TabList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 8px;
`;

interface TabButtonProps {
  $active: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${({ $active }) => ($active ? '30px' : '20px')};
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  color: ${({ $active }) => ($active ? '#2e77ff' : 'black')};
  padding: 8px;
  `;

export const TabScrollWrapper = styled.div`
  width: 40%;
  overflow-x: auto;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
