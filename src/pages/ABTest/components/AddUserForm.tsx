import { Button } from 'antd';
import CustomForm from 'components/common/CustomForm';
import useABTestMutation from './hook/useABTestMutation';

interface AddUserFormProps {
  test_id: string | number;
  data: {
    device_id: string | number;
    variable_name: string;
  };
}

export default function AddUserForm({ test_id, data }: AddUserFormProps) {
  const [form] = CustomForm.useForm();

  const { moveUser } = useABTestMutation();

  const onFinish = (values: any) => {
    moveUser({
      id: test_id,
      data: {
        device_id: values.device_id,
        variable_name: values.variable_name,
      },
    });
  };

  return (
    <CustomForm
      form={form}
      onFinish={onFinish}
      initialValues={{
        test_id,
        device_id: data.device_id,
        variable_name: data.variable_name,
      }}
    >
      <CustomForm.Input
        label="실험 title(변수)"
        name="test_id"
        disabled
      />
      <CustomForm.Input
        label="사용자 device id"
        name="device_id"
        rules={[{ required: true, message: 'Device ID를 입력해주세요.' }]}
        disabled
      />
      <CustomForm.Input
        label="목표 실험군 변수"
        name="variable_name"
        rules={[{ required: true, message: '변수 이름을 입력해주세요.' }]}
      />
      <CustomForm.Item>
        <Button type="primary" htmlType="submit">
          추가
        </Button>
      </CustomForm.Item>
    </CustomForm>
  );
}
