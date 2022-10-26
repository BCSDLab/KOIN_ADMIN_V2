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
  tableData: TableData[];
  currentPage: number;
  totalPage: number;
  handlePageChange: (idx: number) => void;
}

function CustomTable<TableData extends DefaultTableData>({
  tableData, currentPage, totalPage, handlePageChange,
}: Props<TableData>) {
  const navigate = useNavigate();

  const getColumns = (): ColumnsType<TableData> => {
    const columnKeys = Object.keys(tableData[0]);

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
        dataSource={tableData}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            navigate(`${record.id}`);
          },
        })}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={totalPage * 10}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper
      />
    </TableContainer>
  );
}

export default CustomTable;
