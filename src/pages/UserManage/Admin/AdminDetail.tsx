import { UploadOutlined, CrownOutlined } from '@ant-design/icons';
import { Button, Divider, Modal } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useQuery } from '@tanstack/react-query';
import adminQueries from 'queryFactory/adminQueries';
import authQueries from 'queryFactory/authQueries';
import { TRACK_OPTIONS } from 'constant/admin';
import * as S from './AdminDetail.style';
import useAdminMutation from './useAdminMutation';
import DetailForm from './components/DetailForm';

// track_name label을 key로 변환
const getTrackKey = (label: string) => {
  const entry = Object.entries(TRACK_OPTIONS).find(([, val]) => val === label);
  return entry ? entry[0] : label;
};

export default function AdminDetail() {
  const { id } = useParams();
  const { data: adminData } = useQuery(adminQueries.adminInfo(Number(id)));
  const { data: myInfo } = useQuery(authQueries.adminInfo());
  const [form] = CustomForm.useForm();
  const { updateAdminMutation, changeAdminPermissionMutation } = useAdminMutation(Number(id));

  const handlePermissionChange = () => {
    if (!adminData) return;

    const isSuperAdmin = adminData.super_admin;
    Modal.confirm({
      title: isSuperAdmin ? 'SuperAdmin 권한 해제' : 'SuperAdmin 권한 부여',
      content: isSuperAdmin
        ? `'${adminData.name}' 계정의 SuperAdmin 권한을 해제하시겠습니까?`
        : `'${adminData.name}' 계정에 SuperAdmin 권한을 부여하시겠습니까?`,
      okText: '확인',
      cancelText: '취소',
      onOk: () => {
        changeAdminPermissionMutation.mutate({
          id: Number(id),
          body: { super_admin: !isSuperAdmin },
        });
      },
    });
  };

  return (
    <S.Container>
      {adminData && (
        <>
          <DetailHeading>Admin Detail</DetailHeading>
          <S.BreadCrumb>
            {`Admin Management / Admin Detail / ${adminData.name}`}
          </S.BreadCrumb>
          <Divider />
          <CustomForm
            form={form}
            initialValues={{
              ...adminData,
              track_name: getTrackKey(adminData.track_name),
            }}
            onFinish={updateAdminMutation.mutate}
          >
            <DetailForm />
            <S.ButtonWrap>
              {myInfo?.super_admin && (
                <Button
                  icon={<CrownOutlined />}
                  type={adminData.super_admin ? 'default' : 'primary'}
                  danger={adminData.super_admin}
                  onClick={handlePermissionChange}
                  style={{ marginRight: 12 }}
                >
                  {adminData.super_admin ? 'SuperAdmin 권한 해제' : 'SuperAdmin 권한 부여'}
                </Button>
              )}
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                정보 수정
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
        </>
      )}
    </S.Container>
  );
}
