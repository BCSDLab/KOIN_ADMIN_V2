import { useState } from 'react';
import { OS } from 'model/forceUpdate.model';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as S from './OSDropdown.style';

interface OSDropdownProps {
  os: OS;
  handleOS: (type: OS) => void;
}

export default function OSDropdown({ os, handleOS }: OSDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const osList: OS[] = ['android', 'ios'];

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOS = (type: OS) => {
    handleOS(type);
    toggle();
  };

  return (
    <S.TypeContainer>
      <S.Type onClick={toggle}>
        {os}
        <S.Icon>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
      </S.Type>
      {isOpen && (
        <S.MenuList>
          {osList.map(
            (type) => os !== type && (
            <S.Menu onClick={() => selectOS(type)} key={type}>
              {type}
            </S.Menu>
            ),
          )}
        </S.MenuList>
      )}
    </S.TypeContainer>
  );
}
