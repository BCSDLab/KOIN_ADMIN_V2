import { RedirectLink } from 'model/banner.model';

interface Props {
  link: RedirectLink;
}

export default function BannerRedirectLinks({ link }: Props) {
  return (
    <div>
      {(['web', 'android', 'ios'] as const).map((platform) => {
        const url = link[platform];
        return url ? (
          <div key={platform}>
            {`${platform}: ${url}`}
          </div>
        ) : null;
      })}
    </div>
  );
}
