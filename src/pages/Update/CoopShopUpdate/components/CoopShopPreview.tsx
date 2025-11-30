import type { CoopShopInfo } from 'model/coopShop.model';
import Book from 'assets/CoopShop/book.svg';
import Cafe from 'assets/CoopShop/cafe.svg';
import Cut from 'assets/CoopShop/cut.svg';
import Flatware from 'assets/CoopShop/flatware.svg';
import Laundry from 'assets/CoopShop/laundry.svg';
import PostOffice from 'assets/CoopShop/post-office.svg';
import Print from 'assets/CoopShop/print.svg';
import Glasses from 'assets/CoopShop/glasses.svg';
import * as S from './CoopShopPreview.style';

interface CoopShopPreviewProps {
  uploadedData: CoopShopInfo[];
}

const CAFETERIA_HEAD_TABLE = {
  row: ['평일', '주말'],
  col: ['아침', '점심', '저녁'],
};

const SHOP_ICON: Record<string, React.ReactNode> = {
  서점: <Book />,
  대즐: <Cafe />,
  미용실: <Cut />,
  세탁소: <Laundry />,
  우체국: <PostOffice />,
  '복지관 참빛관 편의점': <Cafe />,
  복사실: <Print />,
  학생식당: <Flatware />,
  복지관식당: <Flatware />,
  오락실: <Cafe />,
  안경원: <Glasses />,
  우편취급국: <PostOffice />,
};

function CoopShopPreview({ uploadedData }: CoopShopPreviewProps) {
  const getFormattedShopTime = (open: string, close: string) => {
    if (open === close) {
      return open;
    }
    return `${open} - ${close}`;
  };

  const cafeteriaInfo = uploadedData.find(
    (shop) => shop.coop_shop_info.name === '학생식당',
  );
  const filteredShops = uploadedData.filter(
    (shop) => shop.coop_shop_info.name !== '학생식당',
  );

  const getTimeToTypeAndDay = (type: string, day: string) => {
    const target = cafeteriaInfo?.operation_hours?.find(
      (hour) => hour.day_of_week === day && hour.type === type,
    );
    return target
      ? getFormattedShopTime(target.open_time, target.close_time)
      : '미운영';
  };

  return (
    <S.InfoContainer>
      {cafeteriaInfo && (
        <S.InfoBlock>
          <S.InfoCafeteria>
            <S.InfoTitleContainer>
              <S.IconWrapper>
                <Flatware />
              </S.IconWrapper>
              <S.InfoTitle>학생식당</S.InfoTitle>
            </S.InfoTitleContainer>
            <S.Table>
              <thead>
                <tr>
                  <S.TableHead>시간</S.TableHead>
                  {CAFETERIA_HEAD_TABLE.row.map((type) => (
                    <S.TableHead key={type}>{type}</S.TableHead>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAFETERIA_HEAD_TABLE.col.map((type) => (
                  <tr key={type}>
                    <S.TableCell>{type}</S.TableCell>
                    {CAFETERIA_HEAD_TABLE.row.map((day) => {
                      const timeText = getTimeToTypeAndDay(type, day);
                      return (
                        <S.TableCell $isClosed={timeText === '미운영'}>
                          {timeText}
                        </S.TableCell>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.InfoCafeteria>
        </S.InfoBlock>
      )}

      {filteredShops.map((shop) => (
        <S.InfoBlock key={shop.coop_shop_info.name}>
          <S.IconWrapper>
            {SHOP_ICON[shop.coop_shop_info.name] || <Cafe />}
          </S.IconWrapper>
          <S.InfoDescriptionContainer>
            <S.InfoTitle>{shop.coop_shop_info.name}</S.InfoTitle>
            {shop.operation_hours.map((hour) => (
              <S.InfoDescription>
                {`${hour.day_of_week}: ${getFormattedShopTime(
                  hour.open_time,
                  hour.close_time,
                )}`}
              </S.InfoDescription>
            ))}
          </S.InfoDescriptionContainer>
        </S.InfoBlock>
      ))}
    </S.InfoContainer>

  );
}

export default CoopShopPreview;
