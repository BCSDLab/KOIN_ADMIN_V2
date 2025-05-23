import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import * as S from './BannerPriorityControl.style';

interface Props {
  id: number;
  priority: number | null;
  onChangePriority: (id: number, params: { change_type: 'UP' | 'DOWN' }) => void;
}

export default function BannerPriorityControl({ id, priority, onChangePriority }: Props) {
  return (
    <S.PriorityWrapper>
      <CaretUpOutlined
        style={{ fontSize: 20, cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          onChangePriority(id, { change_type: 'UP' });
        }}
      />
      <S.PriorityValue>{priority !== null ? priority : ''}</S.PriorityValue>
      <CaretDownOutlined
        style={{ fontSize: 20, cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          onChangePriority(id, { change_type: 'DOWN' });
        }}
      />
    </S.PriorityWrapper>
  );
}
