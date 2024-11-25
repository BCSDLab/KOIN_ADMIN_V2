import React, { useEffect, useState } from 'react';
import {
  Button, Divider, message, Tag, Slider, Modal, Input,
} from 'antd';
import {
  CheckCircleOutlined, CloseCircleOutlined,
  DeleteOutlined, LikeOutlined, PlusOutlined, SyncOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import HistoryArea from 'components/common/HistoryArea';
import { useGetABTestQuery } from 'store/api/abtest';
import { useGetHistorysQuery } from 'store/api/history';
import { ABTest } from 'model/abTest.model';
import useBooleanState from 'utils/hooks/useBoolean';
import useABTestMutation from './hook/useABTestMutation';
import * as S from './ABTestDetail.style';
import UserManageModal from './UserManageModal';

interface Variable {
  rate: number;
  display_name: string;
  name: string;
}

export default function ABTestDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: abTestData, isLoading } = useGetABTestQuery(id);
  const { modifyABTest, deleteABTest, postWinner } = useABTestMutation();
  const [form] = CustomForm.useForm();
  const navigate = useNavigate();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [sliderValues, setSliderValues] = useState<number[]>([]);
  const [winner, setWinner] = useState<string>('');
  const { data: historys } = useGetHistorysQuery({ page: 1, domainId: Number(id) });

  // eslint-disable-next-line max-len
  const { value: checkModal, setTrue: checkModalOpen, setFalse: checkModalClose } = useBooleanState();
  const { value: userModal, setTrue: userModalOpen, setFalse: userModalClose } = useBooleanState();

  const calculateSliderValues = (vars: Variable[]): number[] => {
    if (vars.length <= 1) {
      return [];
    }
    const cumulativeRates = vars.reduce<number[]>((acc, curr, index) => {
      if (index === 0) {
        acc.push(curr.rate);
      } else {
        acc.push(acc[index - 1] + curr.rate);
      }
      return acc;
    }, []);
    cumulativeRates.pop();
    return cumulativeRates;
  };

  useEffect(() => {
    if (abTestData) {
      const initialVariables = abTestData.variables || [];
      setVariables(initialVariables);
      form.setFieldsValue({
        id: abTestData.id,
        status: abTestData.status,
        display_title: abTestData.display_title,
        creator: abTestData.creator,
        team: abTestData.team,
        title: abTestData.title,
        description: abTestData.description,
        variables: initialVariables,
      });
      const initialSliderValues = calculateSliderValues(initialVariables);
      setSliderValues(initialSliderValues);
    }
  }, [abTestData, form]);

  const updateVariablesRates = (newRates: number[]) => {
    const updatedVariables = variables.map((variable, index) => ({
      ...variable,
      rate: newRates[index],
    }));
    setVariables(updatedVariables);
    form.setFieldsValue({ variables: updatedVariables });
  };

  const handleSliderChange = (values: number[]) => {
    const newRates: number[] = [];
    newRates.push(values[0]);
    for (let i = 1; i < values.length; i += 1) {
      newRates.push(values[i] - values[i - 1]);
    }
    newRates.push(100 - values[values.length - 1]);
    updateVariablesRates(newRates);
    setSliderValues(values);
  };

  const handleWinner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinner(e.target.value);
  };

  const onFinish = (values: ABTest) => {
    modifyABTest(id, values, {
      onSuccess: () => {
        message.success('AB 테스트가 수정되었습니다.');
        navigate('/abtest');
      },
      onError: (errorMessage) => {
        message.error(errorMessage);
      },
    });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const renderStatusTag = () => {
    const status = form.getFieldValue('status');
    if (status === 'IN_PROGRESS') {
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {status}
        </Tag>
      );
    }
    if (status === 'COMPLETED') {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {status}
        </Tag>
      );
    }
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        {status}
      </Tag>
    );
  };

  return (
    <S.Container>
      <CustomForm form={form} onFinish={onFinish}>
        <Divider orientation="left">세부사항</Divider>
        {renderStatusTag()}
        <br />
        <br />
        <CustomForm.Input label="id" name="id" disabled />
        <CustomForm.Input label="작성자" name="creator" maxLength={50} disabled />
        <CustomForm.Input label="소속팀" name="team" maxLength={50} />
        <CustomForm.Input label="AB테스트의 제목" name="display_title" maxLength={255} />
        <CustomForm.Input label="변수" name="title" disabled maxLength={255} />
        <CustomForm.TextArea label="설명" name="description" maxLength={255} />
        <Divider orientation="left">실험군</Divider>
        {variables.length > 1 && (
          <Slider
            range
            min={0}
            max={100}
            value={sliderValues}
            onChange={handleSliderChange}
          />
        )}
        <CustomForm.List name="variables">
          {(fields) => (
            <>
              {fields.map(({ key, name: fieldIndex, ...restField }) => {
                const variableName = variables[fieldIndex]?.name;

                return (
                  <div key={key}>
                    <CustomForm.Input
                      {...restField}
                      label={`실험군 명 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'display_name']}
                    />
                    <CustomForm.Input
                      {...restField}
                      label={`변수명 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'name']}
                      disabled={!!variableName}
                    />
                    <CustomForm.InputNumber
                      {...restField}
                      label={`비율 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'rate']}
                      disabled
                    />
                    <br />
                    <br />
                  </div>
                );
              })}
              <Input placeholder="승자 실험군의 변수명을 입력해주세요" value={winner} onChange={handleWinner} />
              <br />
              <br />
              <Button
                icon={<LikeOutlined />}
                onClick={checkModalOpen}
              >
                승자 정하기
              </Button>
            </>
          )}
        </CustomForm.List>
        <Divider orientation="left" />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => form.submit()}
        >
          수정
        </Button>
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => setIsModalOpen(true)}>
          삭제
        </Button>
      </CustomForm>

      <Divider orientation="left">수동 인원 추가</Divider>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={userModalOpen}
      >
        실험 인원 수동 추가, 수정 하기
      </Button>
      {(historys && abTestData) && (
        <HistoryArea
          historys={historys.historys}
          creator={abTestData.creator}
          created_at={abTestData.created_at}
        />
      )}

      <Modal
        open={checkModal}
        onCancel={checkModalClose}
        footer={null}
      >
        <S.AroundRow>
          정말로 승자를
          {' '}
          {winner}
          로 하시겠습니까?
          <S.Item>
            <Button
              danger
              onClick={() => { postWinner({ id, winner_name: winner }); }}
            >
              승자 선택
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>취소</Button>
          </S.Item>
        </S.AroundRow>
      </Modal>
      <Modal
        title="수동 인원 추가"
        open={userModal}
        onCancel={userModalClose}
        footer={null}
      >
        {id && abTestData
        && <UserManageModal ABTestId={id} ABTestVariables={abTestData.variables} /> }
      </Modal>

      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <S.AroundRow>
          정말로 삭제하시겠습니까?
          <S.Item>
            <Button
              danger
              onClick={() => {
                deleteABTest(id, {
                  onSuccess: () => {
                    message.success('AB 테스트가 삭제되었습니다.');
                    navigate('/abtest');
                  },
                  onError: (errorMessage) => {
                    message.error(errorMessage);
                  },
                });
                setIsModalOpen(false);
              }}
            >
              삭제
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>취소</Button>
          </S.Item>
        </S.AroundRow>
      </Modal>
    </S.Container>
  );
}
