import { styled } from 'styled-components';

export * from 'styles/Detail.style';

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  .ant-btn-icon-only {
    border: none;
    margin-right: 5px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;
