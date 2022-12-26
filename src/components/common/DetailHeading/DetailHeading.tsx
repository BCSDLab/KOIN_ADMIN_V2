import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  .ant-btn-icon-only {
    border: none;
    margin-right: 5px;
  }
`;

export const Heading = styled.div`
  color: #2c3e50;
  font-size: 28px;
`;

export default function DetailHeading({ children }: Props) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} />
      <Heading>{children}</Heading>
    </Wrap>
  );
}
