import { Tag } from 'antd';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import deliveryRequestQueries from 'queryFactory/deliveryRequestQueries';
import type { DeliveryRequestStatus } from 'model/deliveryRequest.model';
import { toDateStringFormat } from 'utils/ts/date';
import * as S from 'styles/List.style';
import { STATUS_TAG } from './constant';

const COLUMNS = [
  {
    key: 'request_status',
    render: (status: DeliveryRequestStatus) => (
      <Tag color={STATUS_TAG[status].color}>{STATUS_TAG[status].label}</Tag>
    ),
  },
  {
    key: 'created_at',
    title: '요청일',
    render: (createdAt: string) => toDateStringFormat(createdAt),
  },
];

function DeliveryRequestList() {
  const [page, setPage] = useState(1);
  const { data: requestsRes } = useQuery(
    deliveryRequestQueries.deliveryRequestList(page),
  );

  return (
    <S.Container>
      <S.Heading>코인 딜리버리 서비스 요청 목록</S.Heading>
      {requestsRes && (
        <CustomTable
          data={requestsRes.requests}
          pagination={{
            current: page,
            onChange: setPage,
            total: requestsRes.totalPage,
          }}
          columnSize={[10, 15, 40, 15, 20]}
          columns={COLUMNS}
        />
      )}
    </S.Container>
  );
}

export default DeliveryRequestList;
