import {
  Form, Input, Button, List, Space,
} from 'antd';
import { Address } from 'model/address.model';
import { useQuery } from '@tanstack/react-query';
import addressQueries from 'queryFactory/addressQueries';
import { useState } from 'react';
import * as S from './AddressSearch.style';

const { Search } = Input;

interface AddressSearchProps {
  onSelect: (address: Address) => void;
}

export default function AddressSearch({ onSelect } : AddressSearchProps) {
  const [form] = Form.useForm<{ keyword: string }>();
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    currentPage: '1',
    countPerPage: '10',
  });
  const { data, isFetching } = useQuery(addressQueries.addressSearch(searchParams));

  const items = data?.addresses ?? [];

  const onFinish = ({ keyword }: { keyword: string }) => {
    setSearchParams({ keyword, currentPage: '1', countPerPage: '10' });
  };

  const watched = Form.useWatch('keyword', form) ?? '';
  const isDisabled = !watched.trim();

  return (
    <S.Container>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="keyword"
          rules={[{ required: true, message: '검색어를 입력하세요' }]}
          style={{ margin: 0 }}
        >
          <Search
            placeholder="도로명/지번/건물명으로 검색"
            allowClear
            enterButton={(
              <Button type="primary" loading={isFetching} disabled={isDisabled}>
                검색
              </Button>
      )}
            onSearch={() => form.submit()}
            size="large"
          />
        </Form.Item>
      </Form>

      <div>
        <List
          bordered
          loading={isFetching}
          dataSource={items}
          renderItem={(address) => (
            <List.Item key={`${address.road_address}-${address.zip_no}-${address.eng_address}`} onClick={() => onSelect(address)}>
              <Space direction="vertical" size={0}>
                <S.BuildingName>{address.bd_nm === '' ? address.road_address : address.bd_nm}</S.BuildingName>
                <S.RoadAddress>{address.road_address}</S.RoadAddress>
              </Space>
            </List.Item>
          )}
        />
      </div>
    </S.Container>
  );
}
