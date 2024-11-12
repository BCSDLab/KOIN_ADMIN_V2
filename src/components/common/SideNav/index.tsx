import {
  AppstoreOutlined, UserOutlined, ShopOutlined,
  HomeOutlined, UserSwitchOutlined,
  UsergroupDeleteOutlined, FolderOpenOutlined, ControlOutlined,
  UserAddOutlined, BoldOutlined, ApartmentOutlined, SnippetsOutlined, GiftOutlined,
  NotificationOutlined, IssuesCloseOutlined, FormOutlined, UnorderedListOutlined,
  HistoryOutlined, FlagOutlined,
} from '@ant-design/icons';
import {
  Button, Menu, MenuProps,
} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBooleanState from 'utils/hooks/useBoolean';
import useLogout from 'utils/hooks/useLogout';
import CustomForm from 'components/common/CustomForm';
import ChangePasswordForm from './ChangePasswordModal';

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

  getItem('강제업데이트', 'force-update', <IssuesCloseOutlined />, [
    getItem('업데이트 관리', '/force-update', <FormOutlined />),
    getItem('목록 관리', '/update-list', <UnorderedListOutlined />),
  ]),
  getItem('히스토리', 'history', <HistoryOutlined />, [
    getItem('로그 히스토리', '/history', <FlagOutlined />),
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

const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  
  button {
    border: none;
    box-shadow: none;
    padding: 0 7px;;
  }

  span.ant-btn-icon {
    display: none;
  }
`;

function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClickMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  const selectedKeys = pathname.startsWith('/notice') ? ['/notice'] : [pathname];

  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState(false);
  const logout = useLogout();

  return (
    <SideNavConatiner>
      <Logo>
        <Link to="/">
          <LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
        </Link>
      </Logo>
      <Menu
        onClick={onClickMenu}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['service', 'service-store', 'user']}
        mode="inline"
        items={items}
      />
      <ModalWrap>
        <CustomForm.Modal
          buttonText="비밀번호 변경"
          title="비밀번호 변경"
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          <ChangePasswordForm closeModal={closeModal} />
        </CustomForm.Modal>
        <Button onClick={logout}>로그아웃</Button>
      </ModalWrap>

    </SideNavConatiner>
  );
}

export default SideNav;
