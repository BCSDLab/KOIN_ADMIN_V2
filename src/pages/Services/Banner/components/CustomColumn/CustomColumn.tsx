import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { RedirectLink } from 'model/banner.model';
import * as S from './CustomColumn.style';

type Props = {
  toggleBannerActive: (id: number, checked: boolean) => void;
  updateBannerPriority: (id: number, params: { change_type: 'UP' | 'DOWN' }) => void;
};

export default function useBannerColumns({ toggleBannerActive, updateBannerPriority }: Props) {
  return [
    {
      key: 'redirect_link',
      render: (value: RedirectLink) => (
        <div>
          {(['web', 'android', 'ios'] as const).map((platform) => {
            const url = value[platform];
            return url ? (
              <div key={platform}>
                {`${platform}: ${url}`}
              </div>
            ) : null;
          })}
        </div>
      ),
    },
    {
      key: 'is_active',
      render: (value: boolean, record: any) => (
        <Switch
          checked={value}
          onClick={(_, event) => event.stopPropagation()}
          onChange={(checked) => {
            toggleBannerActive(record.id, checked);
          }}
        />

      ),
    },
    {
      key: 'priority',
      render: (value: number | null, record: any) => (
        <S.PriorityWrapper>
          <>
            <CaretUpOutlined
              style={{ fontSize: 20, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                updateBannerPriority(record.id, { change_type: 'UP' });
              }}
            />
            <S.PriorityValue>{value !== null ? value : ''}</S.PriorityValue>
            <CaretDownOutlined
              style={{ fontSize: 20, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                updateBannerPriority(record.id, { change_type: 'DOWN' });
              }}
            />
          </>
        </S.PriorityWrapper>
      ),
    },
  ];
}
