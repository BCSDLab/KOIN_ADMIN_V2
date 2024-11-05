import styled from 'styled-components';

export * from 'styles/List.style';

export const PageContainer = styled.div`
`;

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 72px 48px;
`;

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
`;

export const Menu = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 150px;
  height: 50px;
  border: 1px solid #000;
`;

export const UpdateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const Content = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
`;

export const Theme = styled.div`
  width: 75px;
  flex-shrink: 0;
  align-self: center;
`;

export const Detail = styled.div`
`;

export const Input = styled.input`
  font-size: 14px;
  font-weight: 700;
  width: 70%;
  height: 48px;
  padding: 3px 6px;
`;

export const Button = styled.button`
  width: 150px;
  height: 50px;
  align-self: end;
  font-weight: 700;
`;
