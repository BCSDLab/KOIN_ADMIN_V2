import { ProForm } from '@ant-design/pro-components';
import styled from 'styled-components';

export const ProFormWrap = styled(ProForm)`
  flex-direction: column;
  `;

export const ProFormListWrap = styled.div` 
  width: fit-content;
  border: 1.5px solid black;
  border-radius: 10px;
  padding: 35px;
`;

export const FoodItemsWrap = styled.div`
  display: flex;
  width: 100%;
`;

export const FoodSizeItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ResetFoodListButtonWrap = styled.div`
  display: flex;
  borderRadius: 5px;
  margin: 0 auto auto 15px;
  width: 30px;
  height: 40px;
`;

export const ResetFoodSizeButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ProFormTextWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const CardsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TextsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 15px;
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
