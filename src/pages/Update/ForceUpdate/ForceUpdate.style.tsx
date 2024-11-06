import styled from 'styled-components';

export * from 'styles/List.style';

export const PageContainer = styled.div`
`;

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
