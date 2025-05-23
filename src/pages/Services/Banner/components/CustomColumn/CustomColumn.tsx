import type { ColumnsType } from 'antd/es/table';
import { RedirectLink } from 'model/banner.model';
import BannerRedirectLinks from 'pages/Services/Banner/components/CustomColumn/BannerRedirectLink/BannerRedirectLink';
import BannerActiveSwitch from 'pages/Services/Banner/components/CustomColumn/BannerActiveSwitch/BannerActiveSwitch';
import BannerPriorityControl from 'pages/Services/Banner/components/CustomColumn/BannerPriorityControl/BannerPriorityControl';

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
      render: (value: RedirectLink) => <BannerRedirectLinks link={value} />,
    },
    {
      title: '활성화 여부',
      key: 'is_active',
      dataIndex: 'is_active',
      render: (value: boolean, record: Banner) => (
        <BannerActiveSwitch
          id={record.id}
          isActive={value}
          onToggle={toggleBannerActive}
        />

      ),
    },
    {
      title: '우선순위',
      key: 'priority',
      dataIndex: 'priority',
      render: (value: number | null, record: Banner) => (
        <BannerPriorityControl
          id={record.id}
          priority={value}
          onChangePriority={updateBannerPriority}
        />
      ),
    },
  ];
}
