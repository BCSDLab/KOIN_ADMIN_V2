import React, { useEffect, useState } from 'react';
import {
  Button, Divider, message, Tag, Slider, Modal, Checkbox, Table,
} from 'antd';
import {
  CheckCircleOutlined, CloseCircleOutlined,
  DeleteOutlined, LikeOutlined, PlusOutlined, SyncOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { useGetABTestQuery } from 'store/api/abtest';
import { ABTest } from 'model/abTest.model';
import Search from 'antd/es/input/Search';
import useABTestMutation from './hook/useABTestMutation';
import * as S from './DeleteWarning.style';
import AddUserForm from './AddUserForm';

interface Variable {
  rate: number;
  display_name: string;
  name: string;
}
const userData = [
  { id: '1', name: '김성재', detail: '010-4407-6751' },
  { id: '2', name: '최정훈', detail: 'songsunkook@gmail.com' },
];

const deviceData = [
  {
    id: 1, type: 'mobile', model: 'Galaxy20', last_accessed_at: '2024-07-30',
  },
];
const userColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '이름', dataIndex: 'name', key: 'name' },
  { title: '세부 정보', dataIndex: 'detail', key: 'detail' },
];

const deviceColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '유형', dataIndex: 'type', key: 'type' },
  { title: '모델', dataIndex: 'model', key: 'model' },
  { title: '마지막 접속', dataIndex: 'last_accessed_at', key: 'last_accessed_at' },
];

export default function ABTestDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: abTestData, isLoading } = useGetABTestQuery(id);
  const { modifyABTest, deleteABTest, postWinner } = useABTestMutation();
  const [form] = CustomForm.useForm();
  const navigate = useNavigate();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [sliderValues, setSliderValues] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('name');
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

  const handleOptionChange = (checkedValues: string[]) => {
    setSelectedOption(checkedValues[0]);
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
    } if (status === 'COMPLETED') {
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
    <>
      <CustomForm form={form} onFinish={onFinish}>
        <Divider orientation="left">세부사항</Divider>
        {renderStatusTag()}
        <br />
        <br />
        <CustomForm.Input label="id" name="id" disabled />
        <CustomForm.Input label="작성자" name="creator" />
        <CustomForm.Input label="소속팀" name="team" />
        <CustomForm.Input label="테스트의 제목" name="display_title" />
        <CustomForm.Input label="변수" name="title" disabled />
        <CustomForm.TextArea label="설명" name="description" />
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
                      label={`디스플레이 이름 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'display_name']}
                    />
                    <CustomForm.Input
                      {...restField}
                      label={`변수 이름 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'name']}
                      disabled={!!variableName}
                    />
                    <CustomForm.InputNumber
                      {...restField}
                      label={`비율 ${fieldIndex + 1}`}
                      name={[fieldIndex, 'rate']}
                      disabled
                    />
                    <Button
                      icon={<LikeOutlined />}
                      onClick={() => { postWinner({ id, winner_name: variableName }); }}
                    >
                      승자
                    </Button>
                    <br />
                    <br />
                  </div>
                );
              })}
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
      <Search
        placeholder="사용자 검색"
        onSearch={(value) => console.log('Search:', value)}
        style={{ width: 200 }}
      />

      <Checkbox.Group
        options={['이름', 'ID']}
        defaultValue={['이름']}
        onChange={handleOptionChange}
      />

      {selectedOption === '이름' ? (
        <Table
          columns={userColumns}
          dataSource={userData}
          rowKey="id"
        />
      ) : (
        <Table
          columns={deviceColumns}
          dataSource={deviceData}
          rowKey="id"
        />
      )}
      <AddUserForm
        test_id={13}
        data={{ device_id: 307, variable_name: 'A' }}
      />
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
    </>
  );
}
