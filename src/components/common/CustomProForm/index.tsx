import { ProFormText, ProForm } from '@ant-design/pro-components';
import { ReactNode } from 'react';
import * as S from './CustomProForm.style';

interface CustomProFormTextProps {
  name: string | string[];
  width: number | 'sm' | 'md' | 'lg' | 'xl' | 'lg' | 'xs' | undefined;
  placeholder: string;
}

function CustomProFormText({ name, width, placeholder }: CustomProFormTextProps) {
  return (
    <ProFormText
      name={name}
      width={width}
      placeholder={placeholder}
    />
  );
}

interface CustomProTextWrapProps {
  children: ReactNode;
}

function CustomProTextWrap({ children }: CustomProTextWrapProps) {
  return (
    <S.TextWrap>
      {children}
    </S.TextWrap>
  );
}

interface CustomProCardsWrapProps {
  children: ReactNode;
}

function CustomProCardsWrap({ children }: CustomProCardsWrapProps) {
  return (
    <S.CardsWrap>
      <S.TextsWrap>
        {children}
      </S.TextsWrap>
    </S.CardsWrap>
  );
}

const CustomProForm = Object.assign(ProForm, {
  Text: CustomProFormText,
  TextWrap: CustomProTextWrap,
  CardsWrap: CustomProCardsWrap,
});

export default CustomProForm;
