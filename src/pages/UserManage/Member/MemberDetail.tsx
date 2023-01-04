import { useParams } from 'react-router-dom';

export default function MemberDetail() {
  const { id } = useParams();
  return (
    <h1>
      MemberId:
      {id}
    </h1>
  );
}
