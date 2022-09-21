import { Button, Input } from 'antd';
import styled from 'styled-components';
import { mobile } from 'utils/style/mediaQuery';

export const Container = styled.main`
  min-height: 100vh;
  min-width: 1148px;
  background-color: #e2f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mobile}{
    min-width: 100%;
    padding: 0 32px;
  }
`;

export const LoginForm = styled.form`
  width: 400px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px 80px 60px;
  border-radius: 20px;
  box-shadow: 1px 2px 4px 3px rgba(58, 113, 153, 0.267);
  gap: 20px;
  margin-bottom: 50px;
  ${mobile}{
    width: 100%;
    padding: 40px 32px 60px;
    margin-bottom: 0;
  }
`;

export const LogoImg = styled.img`
  width: 150px;
  margin-bottom: 50px;
  ${mobile}{
    width: 100px;
    margin-bottom: 30px;
  }
`;

export const Header = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
`;

export const Divider = styled.hr`
  width: 100%;
  border-color: #175c8e6e;
  margin: 0 0 20px;
`;

export const StyledInput = styled(Input)`
  height: 50px;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
  ${mobile}{
    height: 44px;
    font-size: 16px;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-weight: 700;
`;
