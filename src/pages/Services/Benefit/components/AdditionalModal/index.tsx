import { Input, List } from 'antd';
import { useState } from 'react';
import { useSearchShopsQuery } from 'store/api/benefit';

interface Props {
  id: number | undefined;
}
const { Search } = Input;
export default function AdditionalModal({ id }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const userInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const { data } = useSearchShopsQuery({ id, keyword }, {
    skip: !id || !keyword,
  });

  return (
    <div>
      <Search
        onChange={userInput}
        placeholder="상점 이름을 입력하세요"
      />
      {data?.benefit_shops
        && (
          <div>
            {data.benefit_shops.length === 0 ? null
              : (
                <div>
                  {data.benefit_shops.length === 0 && keyword.length !== 0
                    ? <List />
                    : data.benefit_shops.map((result) => <div>{result.name}</div>)}
                </div>
              )}
          </div>
        )}
    </div>
  );
}
