import { Button } from 'antd';
import * as S from './ConfirmModal.style';

interface ConfirmModalProps {
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  closeModal: () => void;
}

export default function ConfirmModal({
  description, onConfirm, closeModal, confirmText = '확인', cancelText = '취소',
}: ConfirmModalProps) {
  return (
    <S.ModalContent>
      <S.Description>
        {description}
      </S.Description>
      <S.ButtonWrapper>
        <Button onClick={closeModal}>{cancelText}</Button>
        <Button type="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </S.ButtonWrapper>
    </S.ModalContent>
  );
}
