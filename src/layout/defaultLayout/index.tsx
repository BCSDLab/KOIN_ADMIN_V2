import SideNav from 'components/common/SideNav';
import { Outlet } from 'react-router-dom';
import BackHistoryButton from 'components/common/BackHistoryButton/BackHistoryButton';
import * as S from './defaultLayout.style';

function DefaultLayout() {
  return (
    <S.LayoutContainer>
      <SideNav />
      <S.Main>
        <BackHistoryButton />
        <Outlet />
      </S.Main>
    </S.LayoutContainer>
  );
}

export default DefaultLayout;
