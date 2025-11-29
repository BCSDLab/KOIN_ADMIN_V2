import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  overflow: scroll;
  font-family: Pretendard, sans-serif;
`;

export const Main = styled.div`
  padding: 15px;
  border: 1px solid #777777ff;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ROUTE_TYPE_COLORS: Record<string, string> = {
  주중: '#ffb443',
  주말: '#34adff',
  순환: '#4ed92c',
} as const;

export const RouteType = styled.div<{ $type: string }>`
  padding: 2px 4px;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => ROUTE_TYPE_COLORS[props.$type]};
`;

export const GridContainer = styled.div<{ $columns: number, $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-auto-flow: column;
  margin-top: 30px;
`;

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  padding-right: 12px;
  min-height: 54px;
  gap: 8px; //여기 다름
  color: #000;
  border-right: 2.5px solid #f5f5f5;
`;

export const Standard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 110px;
  padding: 8px;
  justify-content: center;
  text-align: center;
  gap: 8px;
  color: #4b4b4b;
  background-color: #f5f5f5;
`;

export const Detail = styled.div`
  color: #727272;
  font-size: 12px;
  font-weight: 400;
`;

export const Time = styled.div`
  display: flex;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

export const TimeColumn = styled.div`
  display: contents;
`;
