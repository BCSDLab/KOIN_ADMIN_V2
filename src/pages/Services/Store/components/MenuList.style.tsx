import { Button } from 'antd';
import styled from 'styled-components';

export const Wrap = styled.div`
  width: 700px;
  margin-left: 40px;
`;

export const CardWrap = styled.div<{ $id: number; $menuId?: number; }>`
    display: flex;
    justify-content: space-between;
    align-items: start;
    border-radius: none;

    .ant-card{
      width: 650px;
    }

    .ant-icon{
      font-size: larger;
      align-items: center;
    }

    .ant-card-head-title {
      font-size: 15px;
    }

    .ant-card-body{
      padding: 38px;
      display: ${(props) => (props.$id === props.$menuId ? 'block' : 'none')}
    }

    .upload-list-inline .ant-upload-list-item {
      width: 100%;
    }
`;

export const NewMenuWrap = styled.div<{ $isVisible: boolean; }>`
    margin-top: 30px;
    align-items: start;
    border-radius: none;
    display: ${(props) => (props.$isVisible ? 'block' : 'none')};

    .ant-card{
      width: 650px;
    }

    .ant-icon{
      font-size: larger;
      align-items: center;
    }

    .ant-card-head-title {
      font-size: 15px;
    }

    .ant-card-body{
      padding: 38px;
    }

    .upload-list-inline .ant-upload-list-item {
      width: 100%;
    }
    
    button{
      float: right;
    }
`;

export const MenuAddButton = styled(Button)`
  margin-top: 30px;
`;
