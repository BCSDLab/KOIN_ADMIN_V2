import { TRACK_LIST, TRACK_MAPPER } from 'constant/member';
import { Track } from 'model/member.model';
import { useState } from 'react';
import { useGetMemberListQuery } from 'store/api/member';
import * as S from './MemberList.style';
import MemberCard from './component/MemberCard';

const useMemberList = ({ track }: { track: Track }) => {
  const [page] = useState(1);
  const { data } = useGetMemberListQuery({ page, track: TRACK_MAPPER[track] });

  return { data };
};

function MemberList() {
  const [currentTrack, setTrack] = useState<Track>('FrontEnd');
  const { data: membersRes } = useMemberList({ track: currentTrack });

  return (
    <div>
      <h1>
        Member
      </h1>

      <S.Tabs>
        {TRACK_LIST.map((track) => (
          <S.Tab key={track} onClick={() => setTrack(track)} type="button" selected={track === currentTrack}>{track}</S.Tab>
        ))}
      </S.Tabs>

      {membersRes && (
        <S.CardList>
          {membersRes.memberList.map((member) => (
            <MemberCard member={member} key={member.id} />
          ))}
        </S.CardList>
      )}
    </div>
  );
}

export default MemberList;
