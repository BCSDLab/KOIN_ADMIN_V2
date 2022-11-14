/* eslint-disable react/require-default-props */
import { Table } from 'antd';
import Pagination from 'antd/es/pagination';
import type { ColumnsType } from 'antd/es/table';
import { TITLE_MAPPER } from 'constant';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 24px 32px;
  min-width: 1100px;
  display: flex;
  flex-direction: column;
  .ant-table-thead {
    tr > th {
      color: #01579b;
      background-color: #e6f7ff;
    }
  }
  .ant-pagination {
    margin: 20px 40px 0 0;
    align-self: flex-end;
  }
`;

// 반드시 id Prop이 포함되어야 함
interface DefaultTableData {
  id: string | number;
}

interface Props<TableData> {
  data: TableData[];
  pagination?: {
    current: number;
    total: number;
    onChange: (idx: number) => void;
  };
}

function CustomTable<TableData extends DefaultTableData>({
  data, pagination,
}: Props<TableData>) {
  const navigate = useNavigate();

  // 리스트의 담긴 Key값들로 구성된 테이블
  const columns: ColumnsType<TableData> = Object.keys(data[0])
    .map((key) => ({
      // TITLE_MAPPER에 명칭이 존재하면 그 명칭으로 헤더 이름을 변경
      title: TITLE_MAPPER[key] || key.toUpperCase(),
      dataIndex: key,
      key,
    }));

  return (
    <TableContainer>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            navigate(`${record.id}`);
          },
        })}
        pagination={
          pagination?.total ? false : { position: ['bottomRight'] }
        }
      />
      {pagination ? (
        <Pagination
          current={pagination.current}
          total={pagination.total * 10}
          onChange={pagination.onChange}
          showSizeChanger={false}
          showQuickJumper
        />
      ) : null}
    </TableContainer>
  );
}

export default CustomTable;
