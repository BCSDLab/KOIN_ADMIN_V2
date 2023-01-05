import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';

export default function CustomUpload({ name }: { name: string }) {
  const handleFileUpload = async (options) => {
    const { onSuccess, onError, file } = options;

    const image = new FormData();
    image.append('multipartFile', file);

    // 임시로 axios로 써본거고, 가능하면 rtk-query의 Mutation 활용하는게 좋을거같아
    await axios({
      method: 'post',
      url: '/file?fileType=IMAGE',
      data: image,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        // 여기에 담아준 데이터가 아래 e?.fileList[0].response가 됩니당
        onSuccess(res.data.url);
      })
      .catch((e) => {
        onError(e);
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
              // 우리 회사 서비스의 경우, name이 중요하진 않아서 그냥 막 넣었어
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
        // 최대 사진 수에 맞춰서 값을 수정하면 될듯??
        maxCount={1}
        showUploadList={{
          showRemoveIcon: false,
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </FormItem>
  );
}
