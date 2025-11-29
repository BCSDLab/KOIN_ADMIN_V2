import { useState } from 'react';
import type { UploadFile } from 'antd';
import type { ProgressType } from 'model/bus.model';
import type { SemesterInfo } from 'model/coopShop.model';
import {
  Flex, Button, Modal, Form, Input, DatePicker, message, Empty,
} from 'antd';
import DownloadExcel from 'pages/Update/components/DownloadExcel/DownloadExcel';
import SelectExcel from 'pages/Update/components/SelectExcel/SelectExcel';
import UploadExcel from 'pages/Update/components/UploadExcel/UploadExcel';
import CoopShopPreview from './components/CoopShopPreview';
import CoopShopSemesterDropdown from './components/CoopShopSemesterDropdown';
import useCoopShopUpdateMutation from './useCoopShopUpdateMutation';
import * as S from './CoopShopUpdate.style';

function CoopShopUpdate() {
  const [semester, setSemester] = useState<SemesterInfo | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [progress, setProgress] = useState<ProgressType>('initial');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    addCoopShopSemester,
    uploadCoopShopTimetable,
    uploadedData,
    migrateCoopShopTimetable,
  } = useCoopShopUpdateMutation();

  const isInitial = progress === 'initial';
  const isFileSelected = progress === 'selectedFile';
  const isUploadComplete = progress === 'completeUpload';

  const handleClickModalSubmit = async () => {
    try {
      const values = await form.validateFields();

      addCoopShopSemester.mutate(
        {
          semester: values.semester,
          from_date: values.startDate.format('YYYY-MM-DD'),
          to_date: values.endDate.format('YYYY-MM-DD'),
        },
        {
          onSuccess: () => {
            form.resetFields();
            setIsModalOpen(false);
            message.success('학기를 추가하였습니다.');
          },
          onError: () => {
            message.error('다시 입력해주세요.');
          },
        },
      );
    } catch {
      message.error('입력값을 확인해주세요.');
    }
  };

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

    migrateCoopShopTimetable.mutate(
      {
        semesterId: semester.semesterId,
        uploadedData,
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
        <S.Heading>생협</S.Heading>
        <Flex justify="space-between" align="center" gap="large">
          <CoopShopSemesterDropdown
            semester={semester}
            setSemester={setSemester}
            setIsModalOpen={setIsModalOpen}
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
              {fileList.length === 0
                ? '파일을 선택하세요'
                : fileList[0].name}
            </S.TextBox>
            <UploadExcel
              mutation={uploadCoopShopTimetable}
              fileList={fileList}
              setProgress={setProgress}
              kindOfExcel="coopShop"
              isDisabled={!isFileSelected}
            />
          </S.FileSettingWrapper>
          <DownloadExcel
            downloadURL="https://stage-static.koreatech.in/excel/coop_shop_excel_file.xlsx"
            isDisabled={isInitial}
          />
        </Flex>
        <S.FileDataWrapper>
          {(!uploadedData || !isUploadComplete) && (
            <Empty description="값이 없습니다." />
          )}
          {uploadedData && isUploadComplete && (
            <CoopShopPreview uploadedData={uploadedData.coop_shops} />
          )}
        </S.FileDataWrapper>
        <Flex justify="flex-end" gap="large">
          <Button disabled={!isUploadComplete} onClick={handleClickMigrate}>이관</Button>
          <Button disabled={isInitial} onClick={resetData}>
            취소
          </Button>
        </Flex>
      </Flex>
      <Modal
        title="학기 추가하기"
        open={isModalOpen}
        onOk={handleClickModalSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          form={form}
        >
          <Form.Item
            label="학기 이름"
            name="semester"
            rules={[{ required: true, message: '학기 이름을 입력해주세요' }]}
          >
            <Input placeholder="예: 24-1학기" />
          </Form.Item>

          <Form.Item
            label="학기 시작일"
            name="startDate"
            rules={[{ required: true, message: '학기 시작일을 입력해주세요' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="학기 마감일"
            name="endDate"
            rules={[{ required: true, message: '학기 마감일을 입력해주세요' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </S.Container>
  );
}

export default CoopShopUpdate;
