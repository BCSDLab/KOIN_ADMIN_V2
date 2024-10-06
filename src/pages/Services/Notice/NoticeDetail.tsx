import { useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteOutlined, UploadOutlined, EditOutlined, LeftOutlined,
} from '@ant-design/icons';
import { useGetNoticeQuery } from 'store/api/notice';
import { Button, Divider, Modal } from 'antd';
import useNoticeMutation from './useNoticeMutation';
import * as S from './NoticeDetail.style';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: notice } = useGetNoticeQuery(Number(id));
  const { required } = CustomForm.useValidate();
  const [form] = CustomForm.useForm();
  const { updateNotice, deleteNotice } = useNoticeMutation();

  return (
    <S.Container>
      {notice && (
        <>
          <S.HeadingWrapper>
            <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} />
            <S.Heading>공지사항 상세보기</S.Heading>
          </S.HeadingWrapper>
          <CustomForm
            form={form}
            initialValues={notice}
            onFinish={updateNotice}
          >
            <CustomForm.Input name="id" label="글번호" disabled />
            <CustomForm.Input name="author" label="작성자" disabled />
            <CustomForm.Input name="created_at" label="게시일" disabled />
            <CustomForm.Input name="title" label="제목" rules={[required()]} disabled={!isEditing} />
            <CustomForm.Input name="content" label="본문" rules={[required()]} disabled={!isEditing} />
            <S.ButtonWrap>
              <CustomForm.Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                삭제
              </CustomForm.Button>
              <CustomForm.Button
                icon={isEditing ? <UploadOutlined /> : <EditOutlined />}
                htmlType={isEditing ? 'button' : 'submit'}
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? '저장' : '수정'}
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
          <Modal
            title="공지사항 삭제 확인"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Divider />
            해당 공지사항을 삭제하시겠습니까?
            <br />
            코인에 게시된 글도 함께 삭제됩니다.
            <S.ButtonWrapper>
              <Button
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                danger
                onClick={() => deleteNotice(Number(id))}
              >
                삭제
              </Button>
            </S.ButtonWrapper>
          </Modal>
        </>
      )}
    </S.Container>
  );
}
