import { TRACK_LIST, TRACK_MAPPER } from 'constant/member';
import { Track } from 'model/member.model';
import { useState } from 'react';
import { useGetMemberListQuery } from 'store/api/member';

const useMemberList = () => {
  const [page] = useState(1);
  const [track, setTrack] = useState<Track>('FrontEnd');
  const { data } = useGetMemberListQuery({ page, track: TRACK_MAPPER[track] });

  return { data, setTrack };
};

function MemberList() {
  const { data: memberList, setTrack } = useMemberList();
  return (
    <div>
      <h1>
        MemberList
      </h1>

      <div>
        {TRACK_LIST.map((track) => (
          <button onClick={() => setTrack(track)} type="button">{track}</button>
        ))}
      </div>

      {memberList && (
      <div>
        {memberList.memberList[0].name}
      </div>
      )}
    </div>
  );
}

export default MemberList;
