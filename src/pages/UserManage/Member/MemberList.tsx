import { TRACK_LIST, TRACK_MAPPER } from 'constant/member';
import { Track } from 'model/member.model';
import { useState } from 'react';
import { useGetMemberListQuery } from 'store/api/member';
import useBooleanState from 'utils/hooks/useBoolean';
import { Switch } from 'antd';
import CustomForm from 'components/common/CustomForm';
import * as S from './MemberList.style';
import MemberCard from './components/MemberCard';
import AddMemberModal from './components/AddMemberModal';

function MemberList() {
  const [currentTrack, setTrack] = useState<Track>('FrontEnd');
  const { value: isDeleted, changeValue: handleDeleted } = useBooleanState(false);
  const { data: membersRes } = useGetMemberListQuery({
    page: 1,
    track: TRACK_MAPPER[currentTrack],
    is_deleted: isDeleted,
  });
  const { setTrue: openModal, value: isModalOpen, setFalse: closeModal } = useBooleanState();

  return (
    <div>
      <h1>
        Member
      </h1>
      <S.ModalWrap>
        <CustomForm.Modal
          buttonText="생성"
          title="등록하기"
          width={900}
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          <AddMemberModal onCancel={closeModal} />
        </CustomForm.Modal>
      </S.ModalWrap>

      <S.Tabs>
        {TRACK_LIST.map((track) => (
          <S.Tab
            key={track}
            onClick={() => setTrack(track)}
            type="button"
            selected={track === currentTrack}
          >
            {track}
          </S.Tab>
        ))}
      </S.Tabs>

      <S.SwitchWrapper>
        <Switch
          onClick={handleDeleted}
          checked={isDeleted}
          checkedChildren="탈퇴 인원"
          unCheckedChildren="현재 인원"
        />
      </S.SwitchWrapper>

      {membersRes && (
        <S.CardList>
          {membersRes?.memberList
            .map((member) => (
              <MemberCard member={member} key={member.id} />
            ))}
        </S.CardList>
      )}
    </div>
  );
}

export default MemberList;
