/* eslint-disable react-hooks/rules-of-hooks */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Upload, message,
} from 'antd';
import { Domain } from 'model/upload.model';
import { useState } from 'react';
import { useUploadfileMutation } from 'store/api/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile } from 'antd/lib/upload';

interface Props {
  form: FormInstance;
  domain: Domain;
  name: string;
}

const convertUploadFile = (fileUrl: string, index: number): UploadFile => {
  return ({
    uid: `${-(index + 1)}`,
    name: fileUrl,
    status: 'done',
    url: fileUrl,
  });
};

export default function CustomUpload({ form, domain, name }: Props) {
  const [uploadFile] = useUploadfileMutation();
  const isArr = Array.isArray(form.getFieldValue(name));
  let convertedFileList: UploadFile[] = [];
  const [uploadFileList, setUploadFileList] = useState<string[]>(
    isArr
      ? form.getFieldValue(name)
      : [form.getFieldValue(name)],
  );

  if (uploadFileList[0] !== null) {
    convertedFileList = uploadFileList?.map(convertUploadFile);
  }

  const handleUpload = (file: RcFile) => {
    const image = new FormData();
    image.append('multipartFile', file);

    uploadFile({ domain, image })
      .unwrap()
      .then((value) => {
        if (isArr) {
          setUploadFileList([...uploadFileList, `https://${value.file_url}`]);
          form.setFieldValue(name, [
            ...uploadFileList,
            `https://${value.file_url}`,
          ]);
          message.success('업로드에 성공했습니다.');
        } else {
          setUploadFileList([`https://${value.file_url}`]);
          form.setFieldValue(name, `https://${value.file_url}`);
        }
      })
      .catch(() => {
        message.error('업로드에 실패했습니다.');
      });
    return true;
  };

  const removeUpload = (file: UploadFile) => {
    const index = uploadFileList.indexOf(file.url ?? '');
    const newFileList = uploadFileList.slice();
    newFileList.splice(index, 1);
    setUploadFileList(newFileList);

    if (isArr) {
      form.setFieldValue(name, newFileList);
    } else { form.setFieldValue(name, newFileList[0]); }

    return false;
  };

  return (
    <Form.Item name={name}>
      <Upload
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
    </Form.Item>
  );
}
