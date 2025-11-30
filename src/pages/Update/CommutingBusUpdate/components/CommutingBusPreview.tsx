/* eslint-disable react/no-array-index-key */
import { Flex } from 'antd';
import type { BusRouteInfo } from 'model/bus.model';
import BusIcon from 'assets/Bus/bus.svg';
import * as S from './CommutingBusPreview.style';

interface CommutingBusPreviewProps {
  uploadedData: BusRouteInfo[];
}

function CommutingBusPreview({ uploadedData }: CommutingBusPreviewProps) {
  return (
    <S.InfoContainer>
      <Flex gap="100px" vertical>
        {uploadedData.map((data, dataIndex) => {
          const rowLength = data.node_info.length + 1;

          return (
            <S.Main key={`${data.route_name}-${dataIndex}`}>
              <S.TitleWrapper>
                <BusIcon />
                <S.RouteType $type={data.route_type}>
                  {data.route_type}
                </S.RouteType>
              </S.TitleWrapper>
              {`${data.route_name} 시간표`}

              <S.GridContainer
                $columns={data.route_info.length + 1}
                $rows={rowLength}
              >
                {data.route_info.map(({ name, detail, arrival_time }, routeIndex) => (
                  <S.TimeColumn key={`route-${routeIndex}`}>
                    <S.Standard>
                      {name}
                      {detail && (
                        <>
                          <br />
                          {detail}
                        </>
                      )}
                    </S.Standard>
                    {arrival_time.map((time, timeIndex) => (
                      <S.Time key={`time-${timeIndex}`}>
                        {time ? time.split('/')[0] : time}
                      </S.Time>
                    ))}
                  </S.TimeColumn>
                ))}

                <S.Standard>승하차장명</S.Standard>
                {data.node_info.map(({ name, detail }, nodeIndex) => (
                  <S.NodeWrapper key={`node-${nodeIndex}`}>
                    <div>{name}</div>
                    {detail && <S.Detail>{detail}</S.Detail>}
                  </S.NodeWrapper>
                ))}
              </S.GridContainer>
            </S.Main>
          );
        })}
      </Flex>
    </S.InfoContainer>
  );
}

export default CommutingBusPreview;
