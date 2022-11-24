import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from 'store/api/user';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import * as S from './UserDetail.style';

function UserDetail() {
  const { id } = useParams();
  const { data: userData } = useGetUserQuery(Number(id));
  const [form] = CustomForm.useForm();
  const defaultValueArr = getDefaultValueArr(userData);

  return (
    <S.Container>
      {userData && (
        <>
          <S.Heading>User Detail</S.Heading>
          <S.SubHeading>
            {`User Management / User Detail / ${userData.name}`}
          </S.SubHeading>
          <CustomForm form={form} fields={defaultValueArr}>
            <CustomForm.Input label="이름" name="name" />
          </CustomForm>
        </>
      )}
    </S.Container>
  );
}

export default UserDetail;
