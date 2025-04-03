/* eslint-disable react-hooks/rules-of-hooks */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Modal, Upload, message,
} from 'antd';
import { Domain } from 'model/upload.model';
import { useState } from 'react';
import { useUploadfileMutation } from 'store/api/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile } from 'antd/lib/upload';
import * as S from './CustomForm.style';

interface Props {
  form: FormInstance;
  domain: Domain;
  name: string;
}

const createUploadFile = (fileUrl: string, index: number): UploadFile => {
  return ({
    uid: `${-(index + 1)}`,
    name: fileUrl,
    status: 'done',
    url: fileUrl,
  });
};

export default function CustomMultipleUpload({ form, domain, name }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadFile] = useUploadfileMutation();
  const [uploadFileList, setUploadFileList] = useState<string[]>(form.getFieldValue(name) || []);
  let convertedFileList: UploadFile[] = [];
  convertedFileList = uploadFileList?.map(createUploadFile);

  const getBase64 = (file: any): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUpload = (file: RcFile) => {
    const image = new FormData();
    image.append('multipartFile', file);

    uploadFile({ domain, image })
      .unwrap()
      .then((value) => {
        setUploadFileList([...uploadFileList, value.file_url]);
        form.setFieldValue(name, [
          ...uploadFileList,
          value.file_url,
        ]);
        message.success('업로드에 성공했습니다.');
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
    form.setFieldValue(name, newFileList);
    return false;
  };

  return (
    <S.UploadWrap name={name}>
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
        onPreview={handlePreview}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </S.UploadWrap>
  );
}
