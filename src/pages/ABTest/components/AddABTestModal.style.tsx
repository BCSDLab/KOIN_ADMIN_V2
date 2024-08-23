import styled from 'styled-components';

export { Heading } from 'styles/List.style';

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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const SwitchWrapper = styled.div`
  margin: 40px 40px 0;
`;

export const DetailFormWrap = styled.div`
  padding: 0 40px;
`;

export const SubmitButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 100px;
`;

export const ModalWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  margin-right: 70px;
`;

export const StepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap : 5px;
`;

export const Label = styled.div`
  width: 100%;
  font-size: 20px;
`;

export const Input = styled.input`
  width: 50%;
  
`;

export const ButtonWrap = styled.div`
  display: flex;
  margin-top: 10px
`;

export const StepTowLabel = styled.div`
  width: fit-content;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap : 2px;
  border: 1px solid gray;
  border-radius: 10px
`;

export const SubTitle = styled.div`
  font-size: 15px;
  color: gray;
`;

export const StepTwoContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5px
`;

export const AddTestButton = styled.button`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
