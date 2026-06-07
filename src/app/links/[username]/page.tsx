import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LinktreeTracker } from '@/components/LinktreeTracker';
import { LinkItem } from './LinkItem';

type ProfileResponse = {
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  links: { id: string; label: string; url: string }[];
};

const getApiBaseUrl = () =>
  process.env.LINKTREE_API_URL ??
  process.env.NEXT_PUBLIC_LINKTREE_API_URL ??
  'http://localhost:4000';

const getBrowserApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_LINKTREE_API_URL ?? 'http://localhost:4000';

async function getProfile(username: string): Promise<ProfileResponse> {
  const response = await fetch(`${getApiBaseUrl()}/profiles/${username}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function LinktreePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getProfile(username);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 py-12 sm:px-8">
      <LinktreeTracker apiBaseUrl={getBrowserApiBaseUrl()} username={profile.username} />

      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={profile.displayName}
            className="h-24 w-24 rounded-full border border-slate-300 object-cover dark:border-slate-700"
            width={96}
            height={96}
          />
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight">{profile.displayName}</h1>
        {profile.bio ? <p className="text-slate-600 dark:text-slate-300">{profile.bio}</p> : null}
      </div>

      <div className="space-y-3">
        {profile.links.map((link) => (
          <LinkItem
            key={link.id}
            apiBaseUrl={getBrowserApiBaseUrl()}
            username={profile.username}
            link={link}
          />
        ))}
      </div>
    </div>
  );
}
