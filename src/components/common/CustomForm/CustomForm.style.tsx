import {
  Button, Form, Input, InputNumber,
} from 'antd';
import styled from 'styled-components';
import { mobile } from 'utils/style/mediaQuery';

export const GridWrap = styled.div<{ gridColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.gridColumns};
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 0;
  .ant-form-item-label > label {
    width: 120px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    background-color: rgb(243, 243, 243);
    border: rgb(217, 217, 217) solid;
    border-width: 1px;
    border-radius: 0;
    &:after {
      display: none;
      flex-basis: auto;
    }
  }
  // 기본 설정된 반응형에 의한 디자인 깨짐 방지용
  ${mobile}{
    .ant-row .ant-form-item-label {
      flex: 0 1 auto;
      padding: 0;
    }
    .ant-row .ant-form-item-control {
      flex: 1 1 auto;
      padding: 0;
    }
  }
  
  .ant-form-item-explain-error {
    position: absolute;
    right: 12px;
    z-index: 10;
    top: 5px;
  }

  .ant-input-number-input-wrap {
    width: 100%;
  }
`;

export const FormTextItem = styled(Form.Item)`
  margin-bottom: 0;
  .ant-form-item-label > label {
    width: 120px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    background-color: rgb(243, 243, 243);
    border: rgb(217, 217, 217) solid;
    border-width: 1px;
    border-radius: 0;
    &:after {
      display: none;
      flex-basis: auto;
    }
  }
  // 기본 설정된 반응형에 의한 디자인 깨짐 방지용
  ${mobile}{
    .ant-row .ant-form-item-label {
      flex: 0 1 auto;
      padding: 0;
    }
    .ant-row .ant-form-item-control {
      flex: 1 1 auto;
      padding: 0;
    }
  }
  
  .ant-form-item-explain-error {
    position: absolute;
    right: 12px;
    z-index: 10;
    bottom: 35px;
  }

  .ant-input-number-input-wrap {
    width: 100%;
  }
`;

export const FormItemCheckbox = styled(Form.Item)`
  margin-bottom: 0;
  
  .ant-checkbox {
    align-self: center;
    transform: none;
  }

  .ant-checkbox + span {
    padding: 10px 39px 10px 10px;
    font-size: 15px;
    font-weight: 500;
    color: #2c3e50;
  }

  .ant-checkbox-wrapper {
    margin-left: 0;
    align-items: center;
  }

`;

export const StyledInput = styled(Input)`
  border: rgb(217, 217, 217) solid;
  border-width: 1px;
  border-radius: 0;
  display: inline-block;
`;

export const StyledInputNumber = styled(InputNumber)`
  border: rgb(217, 217, 217) solid;
  border-width: 1px;
  border-radius: 0;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  border-radius: 0;
  min-width: 80px;
`;

export const SwitchWrap = styled.h4`
  display: flex;
  gap: 5px;
  margin: 5px 0;
  align-items: center;
`;

export const UploadWrap = styled(Form.Item)`
  margin-top: 40px;
  margin-left: 30px;
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 700px;
    margin: 15px 0 0 10px;
  }


  .ant-modal .ant-modal-content{
    width: 50vw;
    right: 10vw;
  }
`;

export const TextWrap = styled.div`
  display: flex;
  height: 500px;
`;

export const ViewerWrap = styled.div`
  display: flex;
  height: 500px;
  width: calc(944px - 120px);
  overflow: auto;
  padding: 10px 20px;
`;
