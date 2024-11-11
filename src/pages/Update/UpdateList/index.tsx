import { Flex } from 'antd';
import OSDropdown from 'pages/Update/components/OSDropdown';
import { useState } from 'react';
import { OS } from 'model/forceUpdate.model';
import CustomTable from 'components/common/CustomTable';
import { useGetUpdateListQuery } from 'store/api/updateList';
import * as S from './UpdateList.style';

export default function UpdateList() {
  const [os, setOs] = useState<OS>('android');

  const [page, setPage] = useState<number>(1);

  const { data: updateList } = useGetUpdateListQuery({ page, type: os });

  const handleOS = (type: OS) => {
    setOs(type);
  };

  return (
    <Flex vertical>
      <S.Heading>강제 업데이트 목록</S.Heading>
      <OSDropdown
        os={os}
        handleOS={handleOS}
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

    </Flex>
  );
}
