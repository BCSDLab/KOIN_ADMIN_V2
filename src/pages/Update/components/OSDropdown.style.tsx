import styled from 'styled-components';

export const TypeContainer = styled.div`
  position: relative;
  width: 150px;
  height: 50px;
  align-self: end;
`;

export const Type = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-weight: 700;
`;

export const Icon = styled.span`
  position: absolute;
  right: 10px;
`;

export const MenuList = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  padding: 0;
  margin: 0;
  font-weight: 700;
  list-style-type: none;
  z-index: 5;
  background-color: #fff;
`;

export const Menu = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 150px;
  height: 50px;
  border: 1px solid #000;
`;
