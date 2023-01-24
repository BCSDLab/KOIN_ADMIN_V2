/* eslint-disable react-hooks/rules-of-hooks */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Upload, message,
} from 'antd';
import { Domain } from 'model/upload.model';
import React, { useState } from 'react';
import { useUploadfileMutation } from 'store/api/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile } from 'antd/lib/upload';

interface Props {
  form: FormInstance;
  domain: Domain;
  name: string;
}

const useConvertFile = (fileUrl: string, index: number): UploadFile => {
  return {
    uid: `${-(index + 1)}`,
    name: fileUrl,
    status: 'done',
    url: fileUrl,
  };
};

export default function CustomUpload({ form, domain, name }: Props) {
  const [uploadFile] = useUploadfileMutation();
  const [uploadFileList, setUploadFileList] = useState<string[]>(form.getFieldValue(name) || []);

  const convertedFileList: UploadFile[] = uploadFileList?.map(useConvertFile);

  const handleUpload = (file: RcFile) => {
    const image = new FormData();
    image.append('multipartFile', file);

    uploadFile({ domain, image }).unwrap()
      .then((value) => {
        setUploadFileList([...uploadFileList, `https://${value.file_url}`]);
        form.setFieldValue(name, [...uploadFileList, `https://${value.file_url}`]);
        message.success('업로드에 성공했습니다.');
        return true;
      })
      .catch(() => {
        message.error('업로드에 실패했습니다.');
        return false;
      });
  };

  return (
    <Form.Item name={name}>
      <Upload
        listType="picture"
        className="upload-list-inline"
        showUploadList={{
          showRemoveIcon: false,
        }}
        beforeUpload={handleUpload}
        fileList={convertedFileList}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>
  );
}
