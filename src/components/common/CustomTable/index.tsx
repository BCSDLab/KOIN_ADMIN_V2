import { Table } from 'antd';
import Pagination from 'antd/es/pagination';
import type { ColumnsType } from 'antd/es/table';
import { TITLE_MAPPER } from 'constant';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 24px 0;
  width: 100%
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

const TableItemImage = styled.img`
  height: 45px;
  width: auto;
  position: absolute;
  top: 5px;
  left: 5px;
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
  columnSize?: number[];
}

function CustomTable<TableData extends DefaultTableData>(
  { data, pagination, columnSize }: Props<TableData>,
) {
  const navigate = useNavigate();

  const getColumns = (): ColumnsType<TableData> => {
    const columnKeys = Object.keys(data[0]);

    return columnKeys.map((key, idx) => ({
      title: TITLE_MAPPER[key] || key.toUpperCase(),
      dataIndex: key,
      key,
      width: columnSize && columnSize[idx] ? `${columnSize[idx]}%` : 'auto',
      render: (value: string | number | boolean) => {
        if (typeof value === 'boolean') {
          return value ? 'True' : 'False';
        }

        if (typeof value === 'number') {
          return value || '-';
        }

        if (typeof value === 'string') {
          if (value.startsWith('https://')) {
            return <TableItemImage src={value} alt="icon" />;
          }
        }
        return value;
      },
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
