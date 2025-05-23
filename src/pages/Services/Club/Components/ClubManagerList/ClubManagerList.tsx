interface ClubManager {
  name?: string;
  user_id?: string;
}

interface Props {
  managers: ClubManager[];
}

export default function ClubManagerList({ managers }: Props) {
  if (!managers || managers.length === 0) return <>-</>;

  const display = managers.map((m) => {
    if (m.name && m.user_id) return `${m.name}/${m.user_id}`;
    return m.name || m.user_id;
  }).join(', ');

  return <div>{display}</div>;
}
