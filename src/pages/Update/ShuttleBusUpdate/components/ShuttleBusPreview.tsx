/* eslint-disable react/no-array-index-key */
import { Flex } from 'antd';
import BusIcon from 'assets/Bus/bus.svg';
import type { BusRouteInfo } from 'model/bus.model';
import * as S from './ShuttleBusPreview.style';

interface ShuttleBusPreviewProps {
  uploadedData: BusRouteInfo[];
}

function ShuttleBusPreview({ uploadedData }: ShuttleBusPreviewProps) {
  return (
    <S.Container>
      <Flex gap="100px" vertical>
        {uploadedData.map((data) => (
          <S.Main key={`${data.route_name}(${data.sub_name})`}>
            <S.TitleWrapper>
              <BusIcon />
              <S.RouteType $type={data.route_type}>
                {data.route_type}
              </S.RouteType>
            </S.TitleWrapper>
            {`${data.route_name} 시간표`}

            <S.GridContainer
              $columns={data.route_info.length + 1}
              $rows={data.node_info.length + 1}
            >
              <S.Standard>승하차장명</S.Standard>
              {data.node_info.map(({ name, detail }, nodeIndex) => (
                <S.NodeWrapper
                  key={`node-${nodeIndex}`}
                >
                  <div>{name}</div>
                  {detail && <S.Detail>{detail}</S.Detail>}
                </S.NodeWrapper>
              ))}

              {data.route_info.map(({ name, detail, arrival_time }, routeIndex) => (
                <S.TimeColumn key={`route-${routeIndex}`}>
                  <S.Standard>
                    {name}
                    <br />
                    {detail}
                  </S.Standard>
                  {arrival_time.map((time, timeIndex) => (
                    <S.Time key={`time-${timeIndex}`}>
                      {time ? time.split('/')[0] : time}
                    </S.Time>
                  ))}
                </S.TimeColumn>
              ))}
            </S.GridContainer>
          </S.Main>
        ))}
      </Flex>
    </S.Container>
  );
}

export default ShuttleBusPreview;
