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

export const ShopContainer = styled.div`
  background: #ddd;
  padding: 25px;
  height: 60%;
  width: 100%;
  overflow-y: auto;
`;

export const Button = styled.button<{ isClicked: boolean }>`
  cursor: pointer;
  width: 150px;
  height: 50px;
  background: #fff;
  text-align: center;
  transition: scale 0.2s;
  border: ${(props) => (props.isClicked ? '4px solid rgba(129, 173, 255, 0.8) ' : 'none')};
  border-radius: 10px;

  &:active {
    scale: 0.95;
  }
`;
