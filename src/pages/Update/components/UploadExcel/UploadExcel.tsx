import type { UseMutationResult } from '@tanstack/react-query';
import type { CommutingBusRouteInfoResponse, ProgressType, ShuttleBusRouteInfoResponse } from 'model/bus.model';
import type { CoopShopResponse } from 'model/coopShop.model';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import { AxiosError } from 'axios';

type ExcelType = 'shuttleBus' | 'coopShop' | 'commutingBus';

type ExcelNameType = {
  [key in ExcelType]: string;
};

const excelName: ExcelNameType = {
  shuttleBus: 'shuttle-bus-timetable',
  coopShop: 'coop-shop-excel',
  commutingBus: 'commuting-bus-timetable',
};

type ExcelResponseType =
  | CommutingBusRouteInfoResponse
  | ShuttleBusRouteInfoResponse
  | CoopShopResponse;

interface UploadExcelType {
  kindOfExcel: ExcelType,
  mutation: UseMutationResult<ExcelResponseType, AxiosError<{ message?: string }>, FormData>,
  fileList: UploadFile[];
  setProgress: (progress: ProgressType) => void;
  isDisabled: boolean;
}

function UploadExcel({
  mutation, setProgress, kindOfExcel, fileList, isDisabled,
}: UploadExcelType) {
  const handleClickUpload = () => {
    if (fileList.length === 0) return;

    const file = fileList[0] as RcFile;

    const formData = new FormData();
    formData.append(`${excelName[kindOfExcel]}`, file);

    mutation.mutate(formData, {
      onSuccess: () => {
        message.success('파일을 정상적으로 업로드하였습니다.');
        setProgress('completeUpload');
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const errorMessage = error.response?.data.message || '에러가 발생했습니다.';
        message.error(errorMessage);
      },
    });
  };
  return (
    <Button
      onClick={handleClickUpload}
      disabled={isDisabled}
      icon={<UploadOutlined />}
    >
      Upload
    </Button>
  );
}

export default UploadExcel;
