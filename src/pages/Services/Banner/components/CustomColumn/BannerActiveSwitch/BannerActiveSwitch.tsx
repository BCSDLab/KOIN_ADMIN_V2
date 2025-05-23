import { Switch } from 'antd';

interface Props {
  id: number;
  isActive: boolean;
  onToggle: (id: number, checked: boolean) => void;
}

export default function BannerActiveSwitch({ id, isActive, onToggle }: Props) {
  return (
    <Switch
      checked={isActive}
      onClick={(_, event) => event.stopPropagation()}
      onChange={(checked) => onToggle(id, checked)}
    />
  );
}
