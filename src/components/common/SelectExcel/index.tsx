import { Upload, Button, Flex } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { ProgressType } from 'model/bus.model';

interface SelectExcelProps {
  fileList: UploadFile[];
  setFileList: (data: RcFile[]) => void;
  setProgress: (value: ProgressType) => void;
  isDisabled: boolean;
}

function SelectExcel({
  fileList, setFileList, setProgress, isDisabled,
}: SelectExcelProps) {
  const handleClickSetFile = (file: RcFile) => {
    setFileList([file]);
    setProgress('selectedFile');
  };

  return (
    <Flex gap="20px" justify="space-between">
      <Upload
        fileList={fileList}
        beforeUpload={(file) => {
          handleClickSetFile(file);
          return false;
        }}
        showUploadList={false}
        accept=".xls,.xlsx,.xlsm"
      >
        <Button disabled={isDisabled} icon={<SelectOutlined />}>Select</Button>
      </Upload>
    </Flex>
  );
}

export default SelectExcel;
