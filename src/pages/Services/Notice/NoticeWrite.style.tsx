import styled from 'styled-components';

export * from 'styles/List.style';

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const FormWrapper = styled.div`
  padding: 10px 112px 20px 20px;
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

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 16px;
  .ant-btn-icon-only {
    border: none;
    margin-right: 5px;
  }
`;