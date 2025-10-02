import { UseMutateFunction } from '@tanstack/react-query';
import { Switch } from 'antd';

interface Props {
  id: number;
  isActive: boolean;
  onToggle: UseMutateFunction<void, Error, {
    id: number;
    body: {
      is_active: boolean;
    };
  }, unknown>
}

export default function BannerActiveSwitch({ id, isActive, onToggle }: Props) {
  return (
    <Switch
      checked={isActive}
      onClick={(_, event) => event.stopPropagation()}
      onChange={(checked) => onToggle({ id, body: { is_active: checked } })}
    />
  );
}
