import { UseMutateFunction } from '@tanstack/react-query';
import { Button, Modal, Tooltip } from 'antd';
import type { ChangeAdminAuthedRequest } from 'model/admin.model';

interface Props {
  id: number;
  name: string;
  isAuthed: boolean;
  disabled?: boolean;
  onToggle: UseMutateFunction<void, Error, {
    id: number;
    body: ChangeAdminAuthedRequest;
  }, unknown>;
}

export default function AdminAuthedButton({
  id, name, isAuthed, disabled = false, onToggle,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (disabled) return;

    Modal.confirm({
      title: isAuthed ? '계정 비활성화' : '계정 활성화',
      content: isAuthed
        ? `'${name}' 계정을 비활성화하시겠습니까?`
        : `'${name}' 계정을 활성화하시겠습니까?`,
      okText: '확인',
      cancelText: '취소',
      onOk: () => {
        onToggle({ id, body: { is_authed: !isAuthed } });
      },
    });
  };

  const button = (
    <Button
      type={isAuthed ? 'default' : 'primary'}
      danger={isAuthed}
      size="small"
      disabled={disabled}
      onClick={handleClick}
    >
      {isAuthed ? '비활성화' : '활성화'}
    </Button>
  );

  if (disabled) {
    return (
      <Tooltip title="권한이 없습니다">
        {button}
      </Tooltip>
    );
  }

  return button;
}
