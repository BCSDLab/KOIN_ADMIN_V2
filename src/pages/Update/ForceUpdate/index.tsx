import { useState } from 'react';
import { useGetAppVersionQuery, useUpdateAppVersionMutation } from 'store/api/forceUpdate';
import { AppType } from 'model/forceUpdate.model';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import * as S from './ForceUpdate.style';

export default function ForceUpdate() {
  const [appType, setAppType] = useState<AppType>('android');
  const [isOpen, setIsOpen] = useState(false);
  const [appVersion, setAppVersion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: version } = useGetAppVersionQuery(appType);
  const [updateVersion] = useUpdateAppVersionMutation();

  const typeList: AppType[] = ['android', 'ios'];

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const changeType = (type: AppType) => {
    setAppType(type);
    toggle();
  };
  const submit = () => {
    updateVersion({
      type: appType,
      version: appVersion,
      title,
      content,
    });
  };

  return (
    <S.PageContainer>
      <S.Heading>강제 업데이트 관리</S.Heading>
      <S.UpdateContainer>
        <S.TypeContainer>
          <S.Type onClick={toggle}>
            {appType}
            <S.Icon>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
          </S.Type>
          {isOpen && (
          <S.MenuList>
            {typeList.map((type) => (
              appType !== type && <S.Menu onClick={() => changeType(type)}>{type}</S.Menu>
            ))}
          </S.MenuList>
          )}
        </S.TypeContainer>
        {version && (
          <S.UpdateInfo>
            <S.Title>현재 업데이트 상황</S.Title>
            <S.Content>
              <S.Theme>version :</S.Theme>
              {version.version}
            </S.Content>
            <S.Content>
              <S.Theme>title :</S.Theme>
              {version.title}
            </S.Content>
            <S.Content>
              <S.Theme>content :</S.Theme>
              {version.content}
            </S.Content>
          </S.UpdateInfo>
        )}
        <S.UpdateInfo>
          <S.Title>수정 문구는 아래에 입력해서 수정해주세요.</S.Title>
          <S.Content>
            <S.Theme>version :</S.Theme>
            <S.Input
              placeholder="ex) 3.4.0"
              onChange={(e) => setAppVersion(e.target.value)}
            />
          </S.Content>
          <S.Content>
            <S.Theme>title :</S.Theme>
            <S.Input
              placeholder="ex) 변경할 코인업데이트 화면 제목 문구를 작성해주세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </S.Content>
          <S.Content>
            <S.Theme>content :</S.Theme>
            <S.Input
              placeholder="ex) 변경할 코인업데이트 화면 콘텐츠 문구를 작성해주세요."
              onChange={(e) => setContent(e.target.value)}
            />
          </S.Content>
        </S.UpdateInfo>
        <S.Button onClick={submit}>수정 완료</S.Button>
      </S.UpdateContainer>
    </S.PageContainer>
  );
}
