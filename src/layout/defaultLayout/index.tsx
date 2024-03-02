import SideNav from 'components/common/SideNav';
import { ReactNode } from 'react';
import * as S from './defaultLayout.style';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <S.LayoutContainer>
      <SideNav />
      <S.Main>
        {children}
      </S.Main>
    </S.LayoutContainer>
  );
}

export default DefaultLayout;
