import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrap = styled.div`
  .ant-btn-icon-only {
    border: none;
  }
`;

export default function BackHistoryButton() {
  const navigate = useNavigate();

  return (
    <ButtonWrap>
      <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} />
    </ButtonWrap>
  );
}
