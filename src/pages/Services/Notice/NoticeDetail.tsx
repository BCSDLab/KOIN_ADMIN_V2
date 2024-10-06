import { useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteOutlined, UploadOutlined, EditOutlined, LeftOutlined,
} from '@ant-design/icons';
import { useGetNoticeQuery } from 'store/api/notice';
import { Button } from 'antd';
import { styled } from 'styled-components';
import useNoticeMutation from './useNoticeMutation';
import * as S from './NoticeDetail.style';

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  .ant-btn-icon-only {
    border: none;
    margin-right: 5px;
  }
`;

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data: notice } = useGetNoticeQuery(Number(id));
  const { required } = CustomForm.useValidate();
  const [form] = CustomForm.useForm();

  const { updateNotice } = useNoticeMutation();
  const deleteNotice = (noticeId: number) => {
    console.log(noticeId);
  };

  return (
    <S.Container>
      {notice && (
        <>
          <HeadingWrapper>
            <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} />
            <S.Heading>공지사항 상세보기</S.Heading>
          </HeadingWrapper>
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
                onClick={() => deleteNotice(Number(id))}
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
        </>
      )}
    </S.Container>
  );
}
