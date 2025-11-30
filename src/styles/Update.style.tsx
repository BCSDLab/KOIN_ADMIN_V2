import styled from 'styled-components';
import { ROUTE_TYPE_COLORS } from 'constant/bus';

export const Container = styled.div`
  margin-left:20px;
`;

export const Heading = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #404040;
  padding: 12px 0 0 0;
`;

export const FileSettingWrapper = styled.div`
  width: 70%;
  border: solid #dfdfdfff;
  border-width: 1px 0px;
  padding : 10px 0px;
  display: flex;
  justify-content: space-between;
`;

export const FileDataWrapper = styled.div`
  width: 100%;
  height: 70vh; 
  border: 1px solid #d3d3d3ff;
  display: flex;
  justify-content:center;
  align-items: center;
`;

export const TextBox = styled.div`
  line-height: 32px;
`;

export const InfoContainer = styled.div`
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

export const RouteType = styled.div<{ $type: string }>`
  padding: 2px 4px;
  color: #fff;
  border-radius: 4px;
  background-color: ${(props) => ROUTE_TYPE_COLORS[props.$type]};
`;

export const GridContainer = styled.div<{ $columns: number, $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-auto-flow: column;
  margin-top: 30px;
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
