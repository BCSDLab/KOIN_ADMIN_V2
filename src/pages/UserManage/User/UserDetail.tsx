import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from 'store/api/user';
import useNicknameCheck from './hooks/useNicknameCheck';
import useUserMutation from './hooks/useUserMutation';
import * as S from './UserDetail.style';

function UserDetail() {
  const { id } = useParams();
  const { data: userData } = useGetUserQuery(Number(id));
  const [form] = CustomForm.useForm();
  const { changeNickname, checkDuplicateNickname, nicknameValidator } = useNicknameCheck(form);
  const { updateUser } = useUserMutation();

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
              initialValues={userData}
              onFinish={updateUser}
            >
              <Divider orientation="left">기본 정보</Divider>
              <CustomForm.Checkbox name="is_authed" disabled>이메일 인증 완료 여부</CustomForm.Checkbox>

              <CustomForm.Input label="ID" name="id" disabled />
              <CustomForm.Input label="학교 계정" name="portal_account" disabled />

              <CustomForm.Input label="이름" name="name" />
              <CustomForm.GridRow gridColumns="1fr 80px">
                <CustomForm.Input
                  label="닉네임"
                  name="nickname"
                  onChange={changeNickname}
                  rules={[{ validator: nicknameValidator }]}
                />
                <CustomForm.Button onClick={checkDuplicateNickname}>중복확인</CustomForm.Button>
              </CustomForm.GridRow>

              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Input label="학번" name="student_number" />
                <CustomForm.Input label="전공" name="major" disabled />
              </CustomForm.GridRow>
              <CustomForm.Select label="성별" name="gender" options={{ 0: '남성', 1: '여성' }} />
              <CustomForm.Button htmlType="submit">정보 수정</CustomForm.Button>
            </CustomForm>
          </S.FormWrapper>
        </>
      )}
    </S.Container>
  );
}

export default UserDetail;
