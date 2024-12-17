import { styled } from 'styled-components';

export const SearchWrapper = styled.div`
 position: relative;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  max-height: 230px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 32px;
  background: #fff;
  z-index: 1;
`;

export const SearchItem = styled.div`
  border: 0.5px solid #eeeeeeff;
  height: 40px;
  padding: 3px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:hover {
    background: #eee;
    cursor: pointer;
  }
`;

export const ButtonContent = styled.span`
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const DeleteButtonWrapper = styled.button`
  position: absolute;
  top: -15px;
  left: -10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const FlexRight = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px
`;

export const DetailInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;
