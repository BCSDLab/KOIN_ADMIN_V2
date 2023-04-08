import styled from 'styled-components';

export * from 'styles/Detail.style';

export const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;

export const CategoryImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const CategoryItem = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border-right: 1px solid #e8e8e8;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};

  &:nth-child(10n) {
    border-right: none;
  }

  ${CategoryImg} {
    border: 4px solid ${({ selected }) => (selected ? '#1890ff' : 'none')};
  }
`;
