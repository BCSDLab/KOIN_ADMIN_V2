import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useGetMemberQuery } from 'store/api/member';
import * as S from './MemberDetail.style';
import useMemberMutation from './useMemberMutation';
import DetailForm from './components/DetailForm';

function MemberDetail() {
  const { id } = useParams();
  const { data: memberData } = useGetMemberQuery(Number(id));
  const [form] = CustomForm.useForm();
  const { updateMember, deleteMember, undeleteMember } = useMemberMutation(Number(id));

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
              <DetailForm form={form} />
              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  정보 수정
                </CustomForm.Button>
                {memberData.is_deleted
                  ? (
                    <CustomForm.Button danger icon={<ReloadOutlined />} onClick={undeleteMember}>
                      유저 복구
                    </CustomForm.Button>
                  )
                  : (
                    <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteMember}>
                      유저 삭제
                    </CustomForm.Button>
                  )}
              </S.ButtonWrap>
            </CustomForm>
          </S.FormWrapper>
        </>
      )}
    </S.Container>
  );
}

export default MemberDetail;
