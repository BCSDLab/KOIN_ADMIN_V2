import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { UseMutateFunction } from '@tanstack/react-query';
import type { BannerPriorityParams } from 'model/banner.model';
import * as S from './BannerPriorityControl.style';

interface Props {
  id: number;
  priority: number | null;
  onChangePriority: UseMutateFunction<void, Error, {
    id: number;
    body: BannerPriorityParams;
  }, unknown>
}

export default function BannerPriorityControl({ id, priority, onChangePriority }: Props) {
  return (
    <S.PriorityWrapper>
      <CaretUpOutlined
        style={{ fontSize: 20, cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          onChangePriority({ id, body: { change_type: 'UP' } });
        }}
      />
      <S.PriorityValue>{priority !== null ? priority : ''}</S.PriorityValue>
      <CaretDownOutlined
        style={{ fontSize: 20, cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          onChangePriority({ id, body: { change_type: 'DOWN' } });
        }}
      />
    </S.PriorityWrapper>
  );
}
