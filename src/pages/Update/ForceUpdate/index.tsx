import { message, Divider, Flex } from 'antd';
import { useEffect, useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import { OS, UpdateAppVersionRequest } from 'model/forceUpdate.model';
import OSDropdown from 'pages/Update/components/OSDropdown';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import forceUpdateQueries from 'queryFactory/forceUpdate';
import { updateAppVersion } from 'api/forceUpdate';
import * as S from './ForceUpdate.style';

const versionRegex = /^\d+\.\d+\.\d+$/;

const titleStyle = {
  fontSize: '20px',
  fontWeight: '700',
};

const inputStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#000',
  padding: '18px 12px',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
};

const textAreaStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#000',
  borderRadius: '0',
  backgroundColor: '#fff',
  padding: '18px 12px',
};

export default function ForceUpdate() {
  const queryClient = useQueryClient();
  const [os, setOs] = useState<OS>('android');

  const [currentVersionForm] = CustomForm.useForm();
  const [afterVersionForm] = CustomForm.useForm();
  const { pattern, required } = CustomForm.validateUtils();

  const { data: version } = useQuery(forceUpdateQueries.getAppVersion(os));

  const { mutate: updateVersion } = useMutation({
    mutationFn: updateAppVersion,
    onSuccess: () => {
      afterVersionForm.resetFields();
      message.success('업데이트 완료');
      queryClient.invalidateQueries({ queryKey: forceUpdateQueries.allKey() });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleOS = (type: OS) => {
    setOs(type);
  };

  const onFinish = (formData: UpdateAppVersionRequest) => {
    updateVersion({
      type: os,
      version: formData.version,
      title: formData.title,
      content: formData.content,
    });
  };

  useEffect(() => {
    currentVersionForm.setFieldsValue(version);
  }, [currentVersionForm, version]);

  return (
    <Flex vertical>
      <S.Heading>강제 업데이트 관리</S.Heading>
      <OSDropdown
        os={os}
        handleOS={handleOS}
      />
      {version && (
      <CustomForm form={currentVersionForm} initialValues={version}>
        <Divider
          orientation="left"
          orientationMargin="0"
          style={titleStyle}
        >
          현재 업데이트 상황
        </Divider>
        <CustomForm.TextArea label="version" name="version" disabled showCount={false} style={textAreaStyle} autoSize={{ minRows: 1, maxRows: 5 }} />
        <CustomForm.TextArea label="title" name="title" disabled showCount={false} style={textAreaStyle} autoSize={{ minRows: 1, maxRows: 5 }} />
        <CustomForm.TextArea label="content" name="content" disabled showCount={false} style={textAreaStyle} autoSize={{ minRows: 1, maxRows: 5 }} />
      </CustomForm>
      )}
      <Divider />
      <CustomForm form={afterVersionForm} onFinish={onFinish}>
        <Divider
          orientation="left"
          orientationMargin="0"
          style={titleStyle}
        >
          수정 문구는 아래에 입력해서 수정해주세요.
        </Divider>
        <CustomForm.Input
          label="version"
          name="version"
          rules={[pattern(versionRegex, '예시 형식과 맞게 version을 입력해주세요.'), required()]}
          placeholder="ex) 1.2.0"
          style={inputStyle}
        />
        <CustomForm.Input
          label="title"
          name="title"
          rules={[required()]}
          placeholder="변경할 코인업데이트 화면 제목 문구를 작성해주세요."
          style={inputStyle}
        />
        <CustomForm.Input
          label="content"
          name="content"
          rules={[required()]}
          placeholder="변경할 코인업데이트 화면 콘텐츠 문구를 작성해주세요."
          style={inputStyle}
        />
        <Flex justify="end">
          <CustomForm.Button htmlType="submit">수정 완료</CustomForm.Button>
        </Flex>
      </CustomForm>
    </Flex>
  );
}
