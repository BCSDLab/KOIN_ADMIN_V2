import {
  AppstoreOutlined, UserOutlined, CarOutlined, ShopOutlined,
  CoffeeOutlined, HomeOutlined, UserSwitchOutlined,
  UsergroupDeleteOutlined, FolderOpenOutlined, ControlOutlined,
  BarChartOutlined, UserAddOutlined, BoldOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('대시보드', '/', <BarChartOutlined />),

  getItem('코인 서비스', 'service', <AppstoreOutlined />, [
    getItem('주변상점', 'service-store', <ShopOutlined />, [
      getItem('상점 관리', '/store', <ControlOutlined />),
      getItem('카테고리', '/category', <FolderOpenOutlined />),
    ]),
    getItem('학교식단', '/cafeteria', <CoffeeOutlined />),
    getItem('버스 정보', '/bus', <CarOutlined />),
    getItem('복덕방', '/room', <HomeOutlined />),
  ]),

  getItem('회원 관리', 'user', <UserOutlined />, [
    getItem('학생 회원', '/user', <UsergroupDeleteOutlined />),
    getItem('사장님', '/manager', <UserSwitchOutlined />),
    getItem('권한 요청', '/manager-request', <UserAddOutlined />),
    getItem('BCSD Lab', '/member', <BoldOutlined />),
  ]),
];

const SideNavConatiner = styled.nav`
  height: 100vh;
  width: 200px;
  overflow-y: auto;
`;

function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  return (
    <SideNavConatiner>
      <Menu
        onClick={onClick}
        selectedKeys={[pathname]}
        defaultOpenKeys={['service', 'user']}
        style={{ height: '100vh' }}
        mode="inline"
        items={items}
      />
    </SideNavConatiner>
  );
}

export default SideNav;
