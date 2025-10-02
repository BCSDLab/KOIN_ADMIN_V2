/* eslint-disable react-hooks/rules-of-hooks */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Upload, message,
} from 'antd';
import type { Domain } from 'model/upload.model';
import { useState } from 'react';
import { useUploadFileMutation } from 'hooks/useUploadMutation';
import type { UploadFile } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile } from 'antd/lib/upload';
import * as S from './CustomForm.style';

interface Props {
  form: FormInstance;
  domain: Domain;
  name: string;
  accept?: string;
}

const createUploadFile = (fileUrl: string, index: number): UploadFile => {
  return ({
    uid: `${-(index + 1)}`,
    name: fileUrl,
    status: 'done',
    url: fileUrl,
  });
};

export default function CustomSingleUpload({
  form, domain, name, accept,
}: Props) {
  const { mutateAsync: uploadFile } = useUploadFileMutation();

  const [uploadFileList, setUploadFileList] = useState<string[]>([form.getFieldValue(name)]);
  let convertedFileList: UploadFile[] = [];

  if (uploadFileList[0]) {
    convertedFileList = uploadFileList?.map(createUploadFile);
  }

  const handleUpload = async (file: RcFile) => {
    const image = new FormData();
    image.append('multipartFile', file);

    try {
      const res = await uploadFile({ domain, image });
      setUploadFileList([res.file_url]);
      form.setFieldValue(name, res.file_url);
      message.success('업로드에 성공했습니다.');
    } catch {
      message.error('업로드에 실패했습니다.');
    }

    return true;
  };
  const removeUpload = (file: UploadFile) => {
    const index = uploadFileList.indexOf(file.url ?? '');
    const newFileList = uploadFileList.slice();
    newFileList.splice(index, 1);
    setUploadFileList(newFileList);
    form.setFieldValue(name, newFileList[0]);

    return false;
  };

  return (
    <S.UploadWrap name={name}>
      <Upload
        accept={accept}
        listType="picture"
        className="upload-list-inline"
        showUploadList={{
          showRemoveIcon: true,
        }}
        beforeUpload={handleUpload}
        customRequest={() => {}}
        onRemove={removeUpload}
        fileList={convertedFileList}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </S.UploadWrap>
  );
}
