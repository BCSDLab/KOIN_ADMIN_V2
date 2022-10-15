import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// 반드시 key Prop이 포함되어야 함
interface DefaultTableData {
  key: string | number;
}

function CustomTable<TableData extends DefaultTableData>(
  { tableData }: { tableData: TableData[] },
) {
  // 리스트의 담긴 Key값들로 구성된 테이블
  const columns: ColumnsType<TableData> = Object.keys(tableData[0])
    .filter((key) => key !== 'key')
    .map((key) => ({
      title: key.toUpperCase(),
      dataIndex: key,
      key,
    }));

  return (<Table columns={columns} dataSource={tableData} />);
}

export default CustomTable;
