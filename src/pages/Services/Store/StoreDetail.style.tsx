import styled from 'styled-components';

export * from 'styles/Detail.style';

export const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px 0;
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
  /* border-right: 1px solid #e8e8e8; */
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  cursor: pointer;

  &:nth-child(10n) {
    border-right: none;
  }

  border: 4px solid ${({ selected }) => (selected ? 'rgba(129, 173, 255, 0.8)' : 'none')};
  padding: 10px 0;
  margin: 0 5px;
  border-radius: 7px;
  transition: .1s;
`;

export const OpenTimeTable = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 2px solid #7d7d7d;
  border-radius: 8px;
`;

export const OpenTimeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  margin: 5px 0;
`;

export const OpenTimeColHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  padding: 5px 0;
  border-right: 2px solid #e8e8e8;
`;

export const TableData = styled.div<{ colSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span ${({ colSize: colLength }) => colLength};
  border: 2px solid ${({ colSize: colLength }) => (colLength === 1 ? 'none' : '#add1ff')};
`;

export const OpenTableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 2px solid #e8e8e8;

  &:nth-child(7) {
    color: #504dff;
  }

  &:nth-child(8) {
    color: #ff4d4d;
  }
`;

export const OpenTimeItem = styled.div`
  display: flex;
  align-items: center;
`;

export const OpenDay = styled.div`
  font-weight: 600;
  font-size: 22px;
  padding-right: 15px;
  margin: 10px 0;
  border-right: 2px solid #7d7d7d;
`;

export const MainCategoryCheckBoxWrap = styled.div`
  display: flex;
  gap: 5px;
`;
