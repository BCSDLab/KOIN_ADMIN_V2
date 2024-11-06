import AppTypeDropdown from 'pages/Update/components/AppTypeDropdown';
import { useState } from 'react';
import { AppType } from 'model/forceUpdate.model';
import CustomTable from 'components/common/CustomTable';
import { useGetUpdateListQuery } from 'store/api/updateList';
import * as S from './UpdateList.style';

export default function UpdateList() {
  const [appType, setAppType] = useState<AppType>('android');

  const [page, setPage] = useState<number>(1);

  const { data: updateList } = useGetUpdateListQuery({ page, type: appType });

  const handleAppType = (type: AppType) => {
    setAppType(type);
  };

  return (
    <S.PageContainer>
      <S.Heading>강제 업데이트 목록</S.Heading>
      <AppTypeDropdown
        appType={appType}
        handleAppType={handleAppType}
      />
      {updateList
      && (
      <CustomTable
        data={updateList.versions}
        pagination={{
          current: page,
          onChange: setPage,
          total: updateList.total_page,
        }}
        columnSize={[10, 10, 30, 30, 10]}
        hiddenColumns={['id', 'createdAt']}
        onClick={() => {}}
      />
      )}

    </S.PageContainer>
  );
}
