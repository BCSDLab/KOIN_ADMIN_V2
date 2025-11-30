import styled from 'styled-components';

export const InfoContainer = styled.div`
  height: 600px;
  width: 100%;
  max-width: 1132px;
  margin: 50px auto 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 12px;
  overflow: scroll;
  font-family: Pretendard, sans-serif;
  user-select: none;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

export const InfoBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  background: #fafafa;
  padding: 16px 24px;
  height: fit-content;
  width: 360px;
  overflow: hidden;
  word-wrap: break-word;
`;

export const IconWrapper = styled.div`
  border-radius: 8px;
  background: #f1f8ff;
  padding: 12px;
  width: 56px;
  height: 56px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const InfoTitleContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const InfoTitle = styled.div`
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
`;

export const InfoCafeteria = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    border-top: 1px solid #cacaca;
    border-bottom: 1px solid #cacaca;
    background: #eee;
  }

  tbody tr {
    border-bottom: 0.5px solid #cacaca;

    &:last-child {
      border-bottom: 1px solid #cacaca;
    }
  }
`;

export const TableHead = styled.th`
  color: #072552;
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
  padding: 6px 0;
`;

export const TableCell = styled.td<{ $isClosed?: boolean }>`
  color: ${(props) => (props.$isClosed ? '#4590bb' : '#072552')};
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
  text-align: center;
  padding: 4px 0;
`;

export const InfoDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoDescription = styled.div`
  color: #041a44;
  font-weight: 500;
  line-height: 160%;
`;
