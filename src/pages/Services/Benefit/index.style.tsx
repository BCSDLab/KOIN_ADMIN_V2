import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const BenefitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9ecef;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Wrapper = styled.div`
  width: calc(100vw - 200px);

`;

export const Row = styled.tr<{ isclicked: boolean }>`
  display: grid;
  grid-template-columns: 40% 60%;
  cursor: pointer;
  width: 100%;
  height: 50px;
  border: ${(props) => (props.isclicked ? '1px solid rgba(129, 173, 255, 0.8) ' : '1px solid #f0f0f0')};
`;

export const HeaderRow = styled.tr`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  height: 50px;
  border: 1px solid #f0f0f0;
`;

export const HeaderItem = styled.th`
  padding: 15px;
`;

export const TitleItem = styled.td`
  padding: 15px;
`;

export const DetailItem = styled.td`
  padding: 15px;
`;

export const ShopList = styled.table`
  width: 100%;
  border-spacing: 0 10px;
  border-collapse: collapse;
`;
