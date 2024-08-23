/* eslint-disable no-restricted-imports */

import CustomForm from 'components/common/CustomForm';
import { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, PlusCircleOutlined } from '@ant-design/icons';
import * as S from './AddABTestModal.style';
import NewTest from './NewTest';

export default function AddABTestModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const [step, setStep] = useState(1);
  const [title, setTile] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [tests, setTests] = useState([
    { rate: 50, displayName: '', name: '' },
    { rate: 50, displayName: '', name: '' },
  ]);

  const createABTest = () => {
    onCancel();
    form.resetFields();
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      form.submit();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRateChange = (index: number, newRate: number) => {
    const newTests = [...tests];
    newTests[index].rate = newRate;

    const totalRate = newTests.reduce((sum, test) => sum + test.rate, 0);

    if (totalRate !== 100) {
      const remainingRate = 100 - newRate;
      const otherTests = newTests.filter((_, i) => i !== index);
      const adjustedTests = otherTests.map((test) => ({
        ...test,
        // eslint-disable-next-line no-mixed-operators
        rate: Math.floor(test.rate / (totalRate - newRate) * remainingRate),
      }));

      // 총합이 100이 되도록 마지막 항목에 차이를 반영
      // eslint-disable-next-line max-len
      adjustedTests[adjustedTests.length - 1].rate += 100 - adjustedTests.reduce((sum, test) => sum + test.rate, 0);

      // 새로운 테스트 배열에 반영
      newTests.forEach((test, i) => {
        if (i !== index) {
          const adjustedTest = adjustedTests.shift();
          if (adjustedTest) test.rate = adjustedTest.rate;
        }
      });
    }

    setTests(newTests);
  };

  const handleDisplayNameChange = (index: number, value: string) => {
    const newTests = [...tests];
    newTests[index].displayName = value;
    setTests(newTests);
  };

  const handleNameChange = (index: number, value: string) => {
    const newTests = [...tests];
    newTests[index].name = value;
    setTests(newTests);
  };

  const addTest = () => {
    const newTest = { rate: 0, displayName: '', name: '' };
    const newTests = [...tests, newTest];

    const distributedRate = Math.floor(100 / newTests.length);

    setTests(
      newTests.map((test, index) => ({
        ...test,
        rate: index === newTests.length - 1
          ? 100 - distributedRate * (newTests.length - 1) : distributedRate,
      })),
    );
  };

  return (
    <CustomForm
      onFinish={createABTest}
      form={form}
    >
      {step === 1 && (
        <S.StepContainer>
          <S.Label>테스트의 제목</S.Label>
          <S.Input onChange={(e) => setDisplayTitle(e.target.value)} />
          <S.Label>변수</S.Label>
          <S.Input onChange={(e) => setTile(e.target.value)} />
        </S.StepContainer>
      )}
      {step === 2 && (
        <S.StepTwoContainer>
          <S.StepTowLabel>
            <S.Label>실험 제목</S.Label>
            <S.SubTitle>{displayTitle}</S.SubTitle>
            <S.Label>실험 변수 명</S.Label>
            <S.SubTitle>{title}</S.SubTitle>
          </S.StepTowLabel>
          {tests.map((test, index) => (
            <NewTest
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              rate={test.rate}
              displayName={test.displayName}
              name={test.name}
              onRateChange={handleRateChange}
              onDisplayNameChange={handleDisplayNameChange}
              onNameChange={handleNameChange}
            />
          ))}
          <CustomForm.Button
            icon={<PlusCircleOutlined />}
            onClick={addTest}
          >
            실험 추가
          </CustomForm.Button>
        </S.StepTwoContainer>
      )}
      {step === 3 && (
        <S.StepContainer>
          <S.Label>세 번째 단계 제목</S.Label>
          <S.Label>세 번째 단계 내용</S.Label>
        </S.StepContainer>
      )}
      <S.ButtonWrap>
        {step > 1 && (
          <CustomForm.Button
            danger
            icon={<ArrowLeftOutlined />}
            onClick={handlePreviousStep}
          >
            이전
          </CustomForm.Button>
        )}
        <CustomForm.Button
          icon={<ArrowRightOutlined />}
          onClick={handleNextStep}
          htmlType={step === 3 ? 'submit' : 'button'}
        >
          {step === 3 ? '완료' : '다음'}
        </CustomForm.Button>
      </S.ButtonWrap>
    </CustomForm>
  );
}
