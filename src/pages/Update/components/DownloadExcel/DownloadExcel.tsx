import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface DownloadExcelProps {
  downloadURL: string;
  isDisabled: boolean;
}

function DownloadExcel({ downloadURL, isDisabled }: DownloadExcelProps) {
  return (
    <Button href={downloadURL} disabled={isDisabled}>
      <DownloadOutlined />
      엑셀 양식 다운로드
    </Button>
  );
}

export default DownloadExcel;
