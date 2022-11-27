import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
`;

export const Heading = styled.div`
  color: #2c3e50;
  font-size: 28px;
`;

export const SubHeading = styled.div`
  font-size: 13px;
  padding: 12px 0;
`;

export const FormWrapper = styled.div`
  padding: 10px 120px 60px 20px;
  .ant-form-item-label > label {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
  }

  .ant-divider-with-text {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
  }

  .ant-checkbox + span {
    padding: 10px 39px 10px 10px;
    font-size: 15px;
    font-weight: 500;
    color: #2c3e50;
  }

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`;
