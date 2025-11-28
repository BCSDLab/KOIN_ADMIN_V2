import { useState } from 'react';
import type { Semester, ProgressType } from 'model/bus.model';
import type { UploadFile } from 'antd';
import {
  Flex, Button, Empty, message,
} from 'antd';
import DownloadExcel from 'components/common/DownloadExcel';
import BusSemesterDropdown from 'components/common/BusDropdown';
import UploadExcel from 'components/common/UploadExcel';
import SelectExcel from 'components/common/SelectExcel';
import ShuttleBusPreview from './components/ShuttleBusPreview';
import useShuttleBusUpdateMutation from './useShuttleBusUpdateMutation';
import * as S from './index.style';

function ShuttleBusUpdate() {
  const [semester, setSemester] = useState<Semester | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [progress, setProgress] = useState<ProgressType>('initial');
  const {
    uploadShuttleBusTimetable,
    uploadedData,
    migrateShuttleBusTimetable,
  } = useShuttleBusUpdateMutation();

  const isInitial = progress === 'initial';
  const isFileSelected = progress === 'selectedFile';
  const isUploadComplete = progress === 'completeUpload';

  const resetData = () => {
    setSemester(null);
    setFileList([]);
    setProgress('initial');
  };

  const handleClickMigrate = () => {
    if (!uploadedData || !semester) {
      message.error('업로드된 데이터 또는 학기 정보가 없습니다.');
      return;
    }

    migrateShuttleBusTimetable.mutate(
      {
        uploadedData,
        semesterType: semester,
      },
      {
        onSuccess: () => {
          message.success('정상적으로 이관되었습니다.');
          resetData();
        },
        onError: () => {
          message.error('오류가 발생하였습니다.');
        },
      },
    );
  };

  return (
    <S.Container>
      <Flex vertical gap="large">
        <S.Heading>셔틀버스</S.Heading>
        <Flex justify="space-between" align="center" gap="large">
          <BusSemesterDropdown
            semester={semester}
            setSemester={setSemester}
            setProgress={setProgress}
          />
          <S.FileSettingWrapper>
            <SelectExcel
              fileList={fileList}
              setFileList={setFileList}
              setProgress={setProgress}
              isDisabled={isInitial}
            />
            <S.TextBox>
              {fileList.length === 0 ? '파일을 선택하세요' : fileList[0].name}
            </S.TextBox>
            <UploadExcel
              mutation={uploadShuttleBusTimetable}
              fileList={fileList}
              setProgress={setProgress}
              kindOfExcel="shuttleBus"
              isDisabled={!isFileSelected}
            />
          </S.FileSettingWrapper>
          <DownloadExcel
            downloadURL="https://stage-static.koreatech.in/excel/shuttle_bus_excel_file.xlsm"
            isDisabled={isInitial}
          />
        </Flex>
        <S.FileDataWrapper>
          {(!uploadedData || !isUploadComplete) && (
            <Empty description="값이 없습니다." />
          )}
          {uploadedData && isUploadComplete && (
            <ShuttleBusPreview
              uploadedData={uploadedData.shuttle_bus_timetables}
            />
          )}
        </S.FileDataWrapper>
        <Flex justify="flex-end" gap="large">
          <Button disabled={!isUploadComplete} onClick={handleClickMigrate}>
            이관
          </Button>
          <Button disabled={isInitial} onClick={resetData}>
            취소
          </Button>
        </Flex>
      </Flex>
    </S.Container>
  );
}

export default ShuttleBusUpdate;
