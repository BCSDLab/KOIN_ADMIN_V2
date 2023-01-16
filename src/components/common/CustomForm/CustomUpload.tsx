/* eslint-disable react-hooks/rules-of-hooks */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Domain } from 'model/upload.model';
import React from 'react';
import { useUploadfileMutation } from 'store/api/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface Props {
  domain: Domain;
  name: string;
  fileList?: UploadFile[] | undefined ;
}

export default function CustomUpload({ domain, name, fileList }: Props) {
  const [uploadFile] = useUploadfileMutation();

  const handleFileUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;

    const image = new FormData();
    image.append('multipartFile', file);

    await uploadFile({ domain, ...image })
      .then((value) => {
        onSuccess(value);
        console.log(value);
      }).catch((error) => {
        onError(error);
      });
  };

  return (
    <FormItem
      name={name}
      valuePropName="fileList"
      getValueFromEvent={(e: any) => {
        if (e?.fileList[0].response) {
          return [
            {
              thumbUrl: e.fileList[0].response,
              url: e.fileList[0].response,
              name: e.fileList[0].response,
              uid: '-1',
            },
          ];
        }
        return e?.fileList;
      }}
    >
      <Upload
        customRequest={handleFileUpload}
        listType="picture"
        className="upload-list-inline"
        defaultFileList={fileList}
        showUploadList={{
          showRemoveIcon: false,
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </FormItem>
  );
}
