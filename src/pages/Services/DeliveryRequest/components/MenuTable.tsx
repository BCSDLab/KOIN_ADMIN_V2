import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import type { DeliveryRequestMenu } from 'model/deliveryRequest.model';
import { formatPrice } from 'pages/Services/DeliveryRequest/constant';

const OptionGroup = styled.div`
  & + & {
    margin-top: 8px;
  }
`;

const OptionGroupTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const COLUMNS: ColumnsType<DeliveryRequestMenu> = [
  {
    title: '메뉴 ID', dataIndex: 'menu_id', key: 'menu_id', width: '12%',
  },
  { title: '메뉴명', dataIndex: 'name', key: 'name' },
  {
    title: '카테고리',
    dataIndex: 'categories',
    key: 'categories',
    render: (categories: DeliveryRequestMenu['categories']) => (
      categories?.map((category) => category.name).join(', ') || '-'
    ),
  },
  {
    title: '가격',
    dataIndex: 'prices',
    key: 'prices',
    render: (prices: DeliveryRequestMenu['prices']) => (
      prices?.map((price) => (price.name
        ? `${price.name} ${formatPrice(price.price)}`
        : formatPrice(price.price))).join(' / ') || '-'
    ),
  },
  {
    title: '옵션 그룹',
    dataIndex: 'option_groups',
    key: 'option_groups',
    width: '12%',
    render: (groups: DeliveryRequestMenu['option_groups']) => `${groups?.length ?? 0}개`,
  },
];

const renderOptionGroups = (menu: DeliveryRequestMenu) => (
  <div>
    {menu.option_groups?.map((group, _, groups) => (
      <OptionGroup key={`${group.name}-${groups.indexOf(group)}`}>
        <OptionGroupTitle>
          {`${group.name} (${group.is_required ? '필수' : '선택'}, ${group.min_select ?? 0}~${group.max_select ?? 0}개)`}
        </OptionGroupTitle>
        {group.options?.map((option) => `${option.name} +${formatPrice(option.price ?? 0)}`).join(' / ')}
      </OptionGroup>
    ))}
  </div>
);

export default function MenuTable({ menus }: { menus: DeliveryRequestMenu[] }) {
  return (
    <Table<DeliveryRequestMenu>
      columns={COLUMNS}
      dataSource={menus}
      rowKey={(menu) => (menu.menu_id === undefined ? `index-${menus.indexOf(menu)}` : `menu-${menu.menu_id}`)}
      pagination={false}
      size="small"
      expandable={{
        expandedRowRender: renderOptionGroups,
        rowExpandable: (menu) => (menu.option_groups?.length ?? 0) > 0,
      }}
    />
  );
}
