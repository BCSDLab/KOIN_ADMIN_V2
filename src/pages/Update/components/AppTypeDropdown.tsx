import { useState } from 'react';
import { AppType } from 'model/forceUpdate.model';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as S from './AppTypeDropdown.style';

interface AppTypeDropdownProps {
  appType: AppType,
  handleAppType: (type: AppType) => void,
}

export default function AppTypeDropdown({ appType, handleAppType }: AppTypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const typeList: AppType[] = ['android', 'ios'];

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const selectAppType = (type: AppType) => {
    handleAppType(type);
    toggle();
  };

  return (
    <S.TypeContainer>
      <S.Type onClick={toggle}>
        {appType}
        <S.Icon>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
      </S.Type>
      {isOpen && (
      <S.MenuList>
        {typeList.map((type) => (
          appType !== type && (
          <S.Menu
            onClick={() => selectAppType(type)}
            key={type}
          >
            {type}
          </S.Menu>
          )
        ))}
      </S.MenuList>
      )}
    </S.TypeContainer>
  );
}
