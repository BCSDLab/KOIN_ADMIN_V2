import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useQuery } from '@tanstack/react-query';
import memberQueries from 'queryFactory/memberQueries';
import * as S from './MemberDetail.style';
import useMemberMutation from './useMemberMutation';
import DetailForm from './components/DetailForm';

function MemberDetail() {
  const { id } = useParams();
  const { data: memberData } = useQuery(memberQueries.member(Number(id)));
  const [form] = CustomForm.useForm();
  const {
    updateMemberMutation, deleteMemberMutation, undeleteMemberMutation,
  } = useMemberMutation(Number(id));

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
              onFinish={updateMemberMutation.mutate}
            >
              <DetailForm form={form} />
              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  정보 수정
                </CustomForm.Button>
                {memberData.is_deleted
                  ? (
                    <CustomForm.Button
                      danger
                      icon={<ReloadOutlined />}
                      onClick={undeleteMemberMutation.mutate}
                    >
                      유저 복구
                    </CustomForm.Button>
                  )
                  : (
                    <CustomForm.Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={deleteMemberMutation.mutate}
                    >
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
