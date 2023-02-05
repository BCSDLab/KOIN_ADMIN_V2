import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useGetMemberQuery } from 'store/api/member';
import { SELECT_OPTIONS } from 'constant/member';
import * as S from './MemberDetail.style';
import useMemberMutation from './useMemberMutation';

function MemberDetail() {
  const { id } = useParams();
  const { data: memberData } = useGetMemberQuery(Number(id));
  const [form] = CustomForm.useForm();
  const { updateMember, deleteMember } = useMemberMutation(Number(id));

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
              onFinish={updateMember}
            >
              <Divider orientation="left">기본 정보</Divider>
              <CustomForm.InputNumber label="ID" name="id" disabled />
              <CustomForm.Input label="이름" name="name" />
              <CustomForm.GridRow gridColumns="1fr 1fr">
                <CustomForm.Select label="트랙" name="track" options={SELECT_OPTIONS.track} />
                <CustomForm.Select label="직책" name="position" options={SELECT_OPTIONS.position} />
              </CustomForm.GridRow>
              <CustomForm.Input label="이메일" name="email" />
              <CustomForm.Input label="학번" name="student_number" />

              <Divider orientation="left">사진</Divider>
              <S.UploadWrap>
                <CustomForm.SingleUpload domain="members" name="image_url" form={form} />
              </S.UploadWrap>

              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  정보 수정
                </CustomForm.Button>
                <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteMember}>
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

export default MemberDetail;
