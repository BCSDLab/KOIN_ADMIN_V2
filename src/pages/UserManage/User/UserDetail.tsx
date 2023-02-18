import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import SELECT_OPTIONS from 'constant/user';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from 'store/api/user';
import DetailHeading from 'components/common/DetailHeading';
import useNicknameCheck from './hooks/useNicknameCheck';
import useUserMutation from './hooks/useUserMutation';
import * as S from './UserDetail.style';

function UserDetail() {
  const { id } = useParams();
  const { data: userData } = useGetUserQuery(Number(id));
  const [form] = CustomForm.useForm();
  const { handleNicknameChange, checkDuplicateNickname, validator } = useNicknameCheck(form);
  const { updateUser } = useUserMutation();

  return (
    <S.Container>
      {userData && (
        <>
          <DetailHeading>User Detail</DetailHeading>
          <S.BreadCrumb>
            {`User Management / User Detail / ${userData.name}`}
          </S.BreadCrumb>
          <Divider />
          <S.FormWrapper>
            <CustomForm
              form={form}
              initialValues={userData}
              onFinish={updateUser}
            >
              <Divider orientation="left">기본 정보</Divider>
              <CustomForm.Checkbox name="is_authed" disabled>이메일 인증 완료 여부</CustomForm.Checkbox>
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.InputNumber label="ID" name="id" disabled />
                <CustomForm.Input label="최종 로그인 시간" name="last_logged_at" disabled />
              </CustomForm.GridRow>
              <CustomForm.Input label="학교 계정" name="email" disabled />
              <CustomForm.Input label="이름" name="name" />
              <CustomForm.GridRow gridColumns="1fr auto">
                <CustomForm.Input label="닉네임" name="nickname" onChange={handleNicknameChange} rules={[{ validator }]} />
                <CustomForm.Button onClick={checkDuplicateNickname}>중복확인</CustomForm.Button>
              </CustomForm.GridRow>
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Input label="학번" name="student_number" />
                <CustomForm.Input label="전공" name="major" disabled />
              </CustomForm.GridRow>
              <CustomForm.Select label="성별" name="gender" options={SELECT_OPTIONS.gender} />
              <CustomForm.Input label="전화번호" name="phone_number" />
              <CustomForm.Select label="구분" name="identity" options={SELECT_OPTIONS.identity} />

              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  정보 수정
                </CustomForm.Button>
                <CustomForm.Button danger icon={<DeleteOutlined />}>
                  유저 삭제
                </CustomForm.Button>
              </S.ButtonWrap>
            </CustomForm>
          </S.FormWrapper>
        </>
      )}
    </S.Container>
  );
}

export default UserDetail;
