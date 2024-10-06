import styled from 'styled-components';

export * from 'styles/Detail.style';

export const FormWrapper = styled.div`
  padding: 10px 112px 60px 20px;
  .ant-divider-with-text {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 110px);
`;
