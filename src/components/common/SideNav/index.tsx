import {
  AppstoreOutlined, UserOutlined, ShopOutlined,
  HomeOutlined, UserSwitchOutlined,
  UsergroupDeleteOutlined, FolderOpenOutlined, ControlOutlined,
  UserAddOutlined, BoldOutlined, ApartmentOutlined, SnippetsOutlined, GiftOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  getItem('코인 서비스', 'service', <AppstoreOutlined />, [
    getItem('주변상점', 'service-store', <ShopOutlined />, [
      getItem('상점 관리', '/store', <ControlOutlined />),
      getItem('카테고리', '/category', <FolderOpenOutlined />),
      getItem('리뷰 관리', '/review', <SnippetsOutlined />),
      getItem('혜택 관리', '/benefit', <GiftOutlined />),
    ]),
    getItem('복덕방', '/room', <HomeOutlined />),
    getItem('공지사항', '/notice', <NotificationOutlined />),
  ]),

  getItem('회원 관리', 'user', <UserOutlined />, [
    getItem('학생 회원', '/user', <UsergroupDeleteOutlined />),
    getItem('사장님', '/owner', <UserSwitchOutlined />),
    getItem('사장님 권한 요청', '/owner-request', <UserAddOutlined />),
    getItem('BCSD Lab', '/member', <BoldOutlined />),
  ]),

  getItem('테스트', 'test', <ControlOutlined />, [
    getItem('AB 테스트', '/abtest', <ApartmentOutlined />),
  ]),
];

const SideNavConatiner = styled.nav`
  height: 100%;
  width: 200px;
  overflow-y: auto;
`;

const Logo = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f0f0f0;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 56px;
  cursor: pointer;
`;

function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  const selectedKeys = pathname.startsWith('/notice') ? ['/notice'] : [pathname];

  return (
    <SideNavConatiner>
      <Logo>
        <Link to="/">
          <LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
        </Link>
      </Logo>
      <Menu
        onClick={onClick}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['service', 'service-store', 'user']}
        mode="inline"
        items={items}
      />
    </SideNavConatiner>
  );
}

export default SideNav;
