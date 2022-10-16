import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TITLE_MAPPER } from 'constant';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 24px 32px;
  min-width: 1100px;
  .ant-table-thead {
    tr > th {
      color: #01579b;
      background-color: #e6f7ff;
    }
  }
`;

// 반드시 key Prop이 포함되어야 함
interface DefaultTableData {
  key: string | number;
}

interface Props<TableData> {
  tableData: TableData[],
}

function CustomTable<TableData extends DefaultTableData>(
  { tableData }: Props<TableData>,
) {
  // 리스트의 담긴 Key값들로 구성된 테이블
  const columns: ColumnsType<TableData> = Object.keys(tableData[0])
    .filter((key) => key !== 'key')
    .map((key) => ({
      title: TITLE_MAPPER[key] || key.toUpperCase(),
      dataIndex: key,
      key,
    }));

  return (
    <TableContainer>
      <Table columns={columns} dataSource={tableData} />
    </TableContainer>
  );
}

export default CustomTable;
