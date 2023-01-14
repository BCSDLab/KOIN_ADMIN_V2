import { TRACK_LIST, TRACK_MAPPER } from 'constant/member';
import { Track } from 'model/member.model';
import { useState } from 'react';
import { useGetMemberListQuery } from 'store/api/member';
import useBooleanState from 'utils/hooks/useBoolean';
import { Switch } from 'antd';
import * as S from './MemberList.style';
import MemberCard from './component/MemberCard';

const POSITION_SCORE = {
  Mentor: 3,
  Regular: 2,
  Beginner: 1,
};

function MemberList() {
  const [currentTrack, setTrack] = useState<Track>('FrontEnd');
  const { data: membersRes } = useGetMemberListQuery({
    page: 1,
    track: TRACK_MAPPER[currentTrack],
  });
  const {
    value: containDeletedMember,
    changeValue: toggleContainDeletedMember,
  } = useBooleanState(false);

  return (
    <div>
      <h1>
        Member
      </h1>

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
          onClick={toggleContainDeletedMember}
          checked={containDeletedMember}
          checkedChildren="탈퇴 인원 포함"
          unCheckedChildren="탈퇴 인원 포함"
        />
      </S.SwitchWrapper>

      {membersRes && (
        <S.CardList>
          {membersRes.memberList
            .filter((member) => containDeletedMember || !member.is_deleted)
            .sort((a, b) => POSITION_SCORE[b.position] - POSITION_SCORE[a.position])
            .map((member) => (
              <MemberCard member={member} key={member.id} />
            ))}
        </S.CardList>
      )}
    </div>
  );
}

export default MemberList;
