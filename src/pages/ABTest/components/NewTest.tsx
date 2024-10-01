import React from 'react';
import * as S from './AddABTestModal.style';

interface NewTestProps {
  index: number;
  rate: number;
  displayName: string;
  name: string;
  onRateChange: (index: number, rate: number) => void;
  onDisplayNameChange: (index: number, value: string) => void;
  onNameChange: (index: number, value: string) => void;
}

// 함수 선언문으로 NewTest 컴포넌트 정의
function NewTest({
  index,
  rate,
  displayName,
  name,
  onRateChange,
  onDisplayNameChange,
  onNameChange,
}: NewTestProps) {
  return (
    <S.StepTowLabel>
      <S.Label>실험군 제목</S.Label>
      <S.Input
        value={displayName}
        onChange={(e) => onDisplayNameChange(index, e.target.value)}
      />
      <S.Label>실험 변수 명</S.Label>
      <S.Input
        value={name}
        onChange={(e) => onNameChange(index, e.target.value)}
      />
      <S.Label>비율 (%)</S.Label>
      <S.Input
        type="number"
        value={rate}
        onChange={(e) => {
          let inputValue = e.target.value.replace(/[^0-9]/g, '');
          if (inputValue === '') {
            inputValue = '0';
          }
          const numericValue = parseInt(inputValue, 10);

          if (!Number.isNaN(numericValue) && numericValue >= 0) {
            onRateChange(index, numericValue);
          }
        }}
      />
    </S.StepTowLabel>
  );
}

export default NewTest;
