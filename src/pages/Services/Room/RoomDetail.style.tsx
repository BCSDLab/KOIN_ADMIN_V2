import { Form } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
`;

export const Heading = styled.div`
  color: rgb(44 62 80);
  font-size: 28px;
`;

export const SubHeading = styled.div`
  font-size: 13px;
  padding: 12px 0;
`;

export const FormWrap = styled.div`
  padding: 50px 120px 60px 20px;
  .ant-form-item-label > label {
    font-size: 15px;
    font-weight: 600;
    color: rgb(44 62 80);
  }

  .ant-divider-with-text {
    font-size: 15px;
    font-weight: 600;
    color: rgb(44 62 80);
  }

  .ant-checkbox + span {
    padding: 10px 39px 10px 10px;
    font-size: 15px;
    font-weight: 500;
    color: rgb(44 62 80);
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
  margin-bottom: 50px;
  margin-top: 40px;
  display: -webkit-inline-box;
  flex-wrap: wrap;
  width: 50vw;
`;

export const UpLoadWrap = styled.div`
  margin-top: 50px;
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
