/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { message, Slider } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import { ABTest } from 'model/abTest.model';
import * as S from './AddABTestModal.style';
import NewTest from './NewTest';
import useABTestMutation from './hook/useABTestMutation';

function AddABTestModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const [step, setStep] = useState(1);
  const [title, setTile] = useState('');
  const [creator, setCreator] = useState('');
  const [team, setTeam] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [sliderValues, setSliderValues] = useState([50]);
  const [tests, setTests] = useState([
    { rate: 50, displayName: '', name: '' },
    { rate: 50, displayName: '', name: '' },
  ]);

  const { addABTest } = useABTestMutation();

  const handleSliderChange = (values: number[]) => {
    const updatedTests = [...tests];
    updatedTests[0].rate = values[0];

    for (let i = 1; i < values.length; i++) {
      updatedTests[i].rate = values[i] - values[i - 1];
    }

    updatedTests[updatedTests.length - 1].rate = 100 - values[values.length - 1];
    setSliderValues(values);
    setTests(updatedTests);
  };

  const addTest = () => {
    const newTest = { rate: 0, displayName: '', name: '' };
    const newTests = [...tests, newTest];

    const newSliderValue = Math.floor(100 / newTests.length) * newTests.length;
    setSliderValues([...sliderValues, newSliderValue]);

    setTests(
      newTests.map((test, index) => ({
        ...test,
        rate: index === newTests.length - 1
          ? 100 - newSliderValue : newSliderValue / newTests.length,
      })),
    );
  };

  const createABTest = () => {
    const newABTest: ABTest = {
      display_title: displayTitle,
      creator,
      team,
      title,
      description: '',
      variables: tests.map((test) => ({
        rate: test.rate,
        display_name: test.displayName,
        name: test.name,
      })),
    };

    addABTest(newABTest, {
      onSuccess: () => {
        message.success('테스트가 추가되었습니다.');
        onCancel();
        form.resetFields();
      },
    });
  };

  return (
    <CustomForm
      onFinish={createABTest}
      form={form}
    >
      {step === 1 && (
        <S.StepContainer>
          <S.Label>작성자</S.Label>
          <S.Input onChange={(e) => setCreator(e.target.value)} />
          <S.Label>소속팀</S.Label>
          <S.Input onChange={(e) => setTeam(e.target.value)} />
          <S.Label>테스트의 제목</S.Label>
          <S.Input onChange={(e) => setDisplayTitle(e.target.value)} />
          <S.Label>변수</S.Label>
          <S.Input onChange={(e) => setTile(e.target.value)} />
        </S.StepContainer>
      )}
      {step === 2 && (
        <S.StepTwoContainer>
          <S.StepTowLabel>
            <S.Label>작성자</S.Label>
            <S.SubTitle>{creator}</S.SubTitle>
            <S.Label>소속팀</S.Label>
            <S.SubTitle>{team}</S.SubTitle>
            <S.Label>실험 제목</S.Label>
            <S.SubTitle>{displayTitle}</S.SubTitle>
            <S.Label>실험 변수 명</S.Label>
            <S.SubTitle>{title}</S.SubTitle>
          </S.StepTowLabel>
          {tests.map((test, index) => (
            <div key={index}>
              <NewTest
                key={index}
                index={index}
                rate={test.rate}
                displayName={test.displayName}
                name={test.name}
                onRateChange={() => {}}
                onDisplayNameChange={(idx, value) => {
                  const newTests = [...tests];
                  newTests[idx].displayName = value;
                  setTests(newTests);
                }}
                onNameChange={(idx, value) => {
                  const newTests = [...tests];
                  newTests[idx].name = value;
                  setTests(newTests);
                }}
              />
            </div>
          ))}
          <CustomForm.Button icon={<PlusCircleOutlined />} onClick={addTest}>
            실험 추가
          </CustomForm.Button>
        </S.StepTwoContainer>
      )}
      {step === 2 && (
        <Slider
          range
          min={0}
          max={100}
          value={sliderValues}
          onChange={handleSliderChange}
        />
      )}

      <S.ButtonWrap>
        {step > 1 && (
          <CustomForm.Button danger icon={<ArrowLeftOutlined />} onClick={() => setStep(step - 1)}>
            이전
          </CustomForm.Button>
        )}
        <CustomForm.Button
          icon={<ArrowRightOutlined />}
          onClick={() => {
            if (step === 2) {
              form.submit();
            } else {
              setStep(step + 1);
            }
          }}
        >
          {step === 2 ? '완료' : '다음'}
        </CustomForm.Button>
      </S.ButtonWrap>
    </CustomForm>
  );
}

export default AddABTestModal;
