import { TRACK_LIST, TRACK_MAPPER } from 'constant/member';
import { MemberTableHead, Track } from 'model/member.model';
import { useState } from 'react';
import { useGetMemberListQuery } from 'store/api/member';
import * as S from './MemberList.style';
import MemberCard from './components/MemberCard';

const POSITION_SCORE = {
  Mentor: 3,
  Regular: 2,
  Beginner: 1,
};

const getSortedMemberList = (memberList: MemberTableHead[]): MemberTableHead[] => {
  const sortedMemberList = [...memberList].sort(
    (a, b) => POSITION_SCORE[b.position] - POSITION_SCORE[a.position],
  );

  return sortedMemberList;
};

function MemberList() {
  const [currentTrack, setTrack] = useState<Track>('FrontEnd');
  const { data: membersRes } = useGetMemberListQuery({
    page: 1,
    track: TRACK_MAPPER[currentTrack],
  });

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
          {getSortedMemberList(membersRes.memberList).map((member) => (
            <MemberCard member={member} key={member.id} />
          ))}
        </S.CardList>
      )}
    </div>
  );
}

export default MemberList;
