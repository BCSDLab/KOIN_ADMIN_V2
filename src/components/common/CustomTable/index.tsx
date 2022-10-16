import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TITLE_MAPPER } from 'constant';
import { useNavigate } from 'react-router-dom';
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

// 반드시 id Prop이 포함되어야 함
interface DefaultTableData {
  id: string | number;
}

interface Props<TableData> {
  tableData: TableData[],
}

function CustomTable<TableData extends DefaultTableData>(
  { tableData }: Props<TableData>,
) {
  const navigate = useNavigate();

  // 리스트의 담긴 Key값들로 구성된 테이블
  const columns: ColumnsType<TableData> = Object.keys(tableData[0])
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
        dataSource={tableData}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            navigate(`${record.id}`);
          },
        })}
      />
    </TableContainer>
  );
}

export default CustomTable;
