import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useGetMemberQuery } from 'store/api/member';
import * as S from './MemberDetail.style';

function UserDetail() {
  const { id } = useParams();
  const { data: memberData } = useGetMemberQuery(Number(id));
  const [form] = CustomForm.useForm();
  // const { updateUser } = useUserMutation();

  return (
    <S.Container>
      {memberData && (
        <>
          <DetailHeading>Member Detail</DetailHeading>
          <S.BreadCrumb>
            {`Member Management / Member Detail / ${memberData.name}`}
          </S.BreadCrumb>
          <Divider />
          <S.FormWrapper>
            <CustomForm
              form={form}
              initialValues={memberData}
              // onFinish={updateUser}
            >
              <Divider orientation="left">기본 정보</Divider>
              <CustomForm.InputNumber label="ID" name="id" disabled />
              <CustomForm.Input label="이름" name="name" />
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Input label="트랙" name="track" />
                <CustomForm.Input label="직책" name="position" />
              </CustomForm.GridRow>
              <CustomForm.Input label="이메일" name="email" />
              <CustomForm.Input label="학번" name="student_number" />

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
