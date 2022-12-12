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

function CustomTable<TableData extends DefaultTableData>({ data, pagination }: Props<TableData>) {
  const navigate = useNavigate();

  const getColumns = (): ColumnsType<TableData> => {
    const columnKeys = Object.keys(data[0]);

    return columnKeys.map((key) => ({
      title: TITLE_MAPPER[key] || key.toUpperCase(),
      dataIndex: key,
      key,
    }));
  };

  return (
    <TableContainer>
      <Table
        columns={getColumns()}
        dataSource={data}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            navigate(`${record.id}`);
          },
        })}
        pagination={pagination ? false : { position: ['bottomRight'] }}
      />
      {pagination && (
        <Pagination
          current={pagination.current}
          total={pagination.total * 10}
          onChange={pagination.onChange}
          showSizeChanger={false}
          showQuickJumper
        />
      )}
    </TableContainer>
  );
}

export default CustomTable;
