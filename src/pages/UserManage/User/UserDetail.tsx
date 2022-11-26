import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useGetNicknameCheckMutation, useGetUserQuery, useUpdateUserMutation } from 'store/api/user';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import * as S from './UserDetail.style';

function UserDetail() {
  const { id } = useParams();
  const { data: userData } = useGetUserQuery(Number(id));
  const [form] = CustomForm.useForm();
  const defaultValueArr = getDefaultValueArr(userData);
  const [checkNickname] = useGetNicknameCheckMutation();
  const [updateUserRequest] = useUpdateUserMutation();

  const checkDuplicateNickname = () => checkNickname(form.getFieldValue('nickname')).then(() => Promise.resolve()).catch(() => Promise.reject());
  const updateUser = (formData: typeof userData) => {
    if (formData) {
      updateUserRequest(formData);
    }
  };

  return (
    <S.Container>
      {userData && (
        <>
          <S.Heading>User Detail</S.Heading>
          <S.SubHeading>
            {`User Management / User Detail / ${userData.name}`}
          </S.SubHeading>
          <Divider />
          <S.FormWrapper>
            <CustomForm
              form={form}
              fields={defaultValueArr}
              onFinish={updateUser}
            >
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Input label="ID" name="id" disabled />
                <CustomForm.Input label="학교 계정" name="portal_account" disabled />
              </CustomForm.GridRow>
              <CustomForm.GridRow gridColumns="50% 1fr 80px">
                <CustomForm.Input label="이름" name="name" />
                <CustomForm.Input label="닉네임" name="nickname" rules={[{ validator: checkDuplicateNickname }]} />
                <CustomForm.Button onClick={() => checkNickname('재히히')}>중복확인</CustomForm.Button>
              </CustomForm.GridRow>
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Input label="학번" name="student_number" />
                <CustomForm.Input label="전공" name="major" disabled />
              </CustomForm.GridRow>
              <CustomForm.Button htmlType="submit">정보 수정</CustomForm.Button>
            </CustomForm>
          </S.FormWrapper>
        </>
      )}
    </S.Container>
  );
}

export default UserDetail;
