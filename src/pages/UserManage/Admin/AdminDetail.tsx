import { UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import DetailHeading from 'components/common/DetailHeading';
import { useQuery } from '@tanstack/react-query';
import adminQueries from 'queryFactory/adminQueries';
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
  const [form] = CustomForm.useForm();
  const { updateAdminMutation } = useAdminMutation(Number(id));

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
