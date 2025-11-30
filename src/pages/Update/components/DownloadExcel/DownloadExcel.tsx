import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { EXCEL_DOWNLOAD_URL, DownloadType } from 'constant/bus';

interface DownloadExcelProps {
  type: DownloadType;
  isDisabled: boolean;
}

function DownloadExcel({ type, isDisabled }: DownloadExcelProps) {
  return (
    <Button href={EXCEL_DOWNLOAD_URL[type]} disabled={isDisabled}>
      <DownloadOutlined />
      엑셀 양식 다운로드
    </Button>
  );
}

export default DownloadExcel;
