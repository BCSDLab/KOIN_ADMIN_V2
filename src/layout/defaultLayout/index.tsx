import SideNav from 'components/common/SideNav';
import { Outlet } from 'react-router-dom';
import * as S from './defaultLayout.style';

function DefaultLayout() {
  return (
    <S.LayoutContainer>
      <SideNav />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.LayoutContainer>
  );
}

export default DefaultLayout;
