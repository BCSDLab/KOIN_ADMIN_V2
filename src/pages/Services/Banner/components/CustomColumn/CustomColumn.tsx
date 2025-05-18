import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RedirectLink } from 'model/banner.model';
import * as S from './CustomColumn.style';

interface Banner {
  id: number;
  redirect_link: RedirectLink;
  is_active: boolean;
  priority: number | null;
}

interface Props {
  toggleBannerActive: (id: number, checked: boolean) => void;
  updateBannerPriority: (id: number, params: { change_type: 'UP' | 'DOWN' }) => void;
}

export default function useBannerColumns({
  toggleBannerActive,
  updateBannerPriority,
}: Props): ColumnsType<Banner> {
  return [
    {
      title: '광고 링크',
      key: 'redirect_link',
      dataIndex: 'redirect_link',
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
      title: '활성화 여부',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (value: boolean, record: Banner) => (
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
      title: '우선순위',
      key: 'priority',
      dataIndex: 'priority',
      render: (value: number | null, record: Banner) => (
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
