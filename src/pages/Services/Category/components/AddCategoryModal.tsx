/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import { message } from 'antd';
import * as S from 'styles/List.style';
import { Category } from 'model/category.model';
import DetailForm from './DetailForm';
import useCategoryMutation from '../useCategoryMutation';

export default function AddCategoryModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addCategory } = useCategoryMutation();

  const createCategory = (values: Category) => {
    addCategory.mutate(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        onCancel();
        form.resetFields();
      },
    });
  };

  return (
    <CustomForm
      onFinish={createCategory}
      form={form}
    >
      <S.DetailFormWrap>
        <DetailForm form={form} />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
