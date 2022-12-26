import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
`;

export const SubHeading = styled.div`
  font-size: 13px;
  padding: 12px 0;
`;

export const FormWrap = styled.div`
  padding: 20px 120px 60px 20px;
  
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

export const FormItem = styled(Form.Item)`
  margin-left: 25px;
  margin-bottom: 50px;
`;

export const CheckboxWrap = styled.div`
  margin-left: 25px;
  margin-bottom: 20px;
  margin-top: 10px;
  display: -webkit-inline-box;
  flex-wrap: wrap;
  width: 50vw;
`;

export const UploadWrap = styled.div`
  margin-top: 40px;
  margin-left: 30px;
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 700px;
    margin: 15px 0 0 10px;
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  display: flex;
`;
