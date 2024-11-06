import { message } from 'antd';
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

  const typeList: AppType[] = ['android', 'ios'];
  const versionRegex = /^\d+\.\d+\.\d+$/;

  const { data: version } = useGetAppVersionQuery(appType);
  const [updateVersion] = useUpdateAppVersionMutation();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAppType = (type: AppType) => {
    setAppType(type);
    toggle();
  };

  const checkForm = (inputArray: string[]) => {
    const themes = ['version', 'title', 'content'];
    if (!versionRegex.test(inputArray[0]) && inputArray[0] !== '') {
      message.error('예시 형식과 맞게 version을 입력해주세요.');
      return true;
    }
    const hasEmptyField = inputArray.some((text, index) => {
      if (text === '') {
        const theme = themes[index];
        message.error(`${theme}는 필수 값입니다. ${theme}값을 입력해주세요.`);
        return true;
      }
      return false;
    });
    return hasEmptyField;
  };

  const submit = () => {
    const inputArray = [appVersion, title, content];
    if (checkForm(inputArray)) return;
    updateVersion({
      type: appType,
      version: appVersion,
      title,
      content,
    })
      .then(() => {
        setAppVersion('');
        setTitle('');
        setContent('');
        message.success('업데이트 완료');
      })
      .catch(({ data }) => {
        message.error(data.message);
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
              appType !== type && <S.Menu onClick={() => handleAppType(type)}>{type}</S.Menu>
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
              value={appVersion}
              onChange={(e) => setAppVersion(e.target.value)}
            />
          </S.Content>
          <S.Content>
            <S.Theme>title :</S.Theme>
            <S.Input
              placeholder="ex) 변경할 코인업데이트 화면 제목 문구를 작성해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </S.Content>
          <S.Content>
            <S.Theme>content :</S.Theme>
            <S.Input
              placeholder="ex) 변경할 코인업데이트 화면 콘텐츠 문구를 작성해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </S.Content>
        </S.UpdateInfo>
        <S.Button onClick={submit}>수정 완료</S.Button>
      </S.UpdateContainer>
    </S.PageContainer>
  );
}
