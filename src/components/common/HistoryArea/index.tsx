import { List } from 'antd';
import { CardProps } from 'antd/lib';
import { HistoryInfo } from 'model/history.model';
import * as S from './HistoryArea.style';

interface HistoryAreaProps {
  histories: HistoryInfo[],
  creator?: string,
  created_at?: string,
}

export default function HistoryArea({
  histories, creator, created_at, ...args
}: HistoryAreaProps & CardProps) {
  return (
    <S.HistoryArea {...args}>
      <List
        dataSource={histories}
        renderItem={(item) => <List.Item style={{ padding: '0', border: 'none' }}>{`${item.created_at} ${item.request_method} (${item.name})`}</List.Item>}
        locale={{ emptyText: ' ' }}
      />
      <div>{`${created_at} 생성 (${creator})`}</div>
    </S.HistoryArea>
  );
}
