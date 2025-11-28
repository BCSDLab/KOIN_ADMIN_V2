import styled from 'styled-components';

export const Container = styled.div`
  height: 600px;
  overflow: scroll;
`;

export const Main = styled.div`
  width: 100%;
  max-width: 1132px;
  margin: 0 auto;
  user-select: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  margin: 50px 0 84px;
`;

export const Title = styled.h2`
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;

export const Subtitle = styled.div`
  color: #4b4b4b;
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  flex-direction: column;
  height: 600px;
  margin-top: 50px;
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
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 160%;
  padding: 6px 0;
`;

export const TableCell = styled.td<{ $isClosed?: boolean }>`
  color: ${(props) => (props.$isClosed ? '#4590bb' : '#072552')};
  font-family: Pretendard, sans-serif;
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
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;
`;
