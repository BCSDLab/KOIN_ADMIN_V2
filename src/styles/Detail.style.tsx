import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  font-family: "Noto Sans KR", "Avenir", "Helvetica", "Arial", "sans-serif";
  position: relative;
`;

export const BreadCrumb = styled.div`
  font-size: 13px;
  padding: 12px 0;
`;

export const Heading = styled.div`
  color: #2c3e50;
  font-size: 28px;
`;

export const FormWrap = styled.div`
  padding: 20px 120px 60px 20px;

  .ant-divider-with-text {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const FormItem = styled(Form.Item)`
  margin-left: 25px;
  margin-bottom: 50px;
`;

export const CheckboxWrap = styled.div`
  margin-left: 25px;
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

export const UploadWrap = styled.div``;

export const ButtonWrap = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  display: flex;
  justify-content: flex-end;
`;
