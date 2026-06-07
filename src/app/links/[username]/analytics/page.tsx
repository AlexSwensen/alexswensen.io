import { notFound } from 'next/navigation';

type AnalyticsResponse = {
  username: string;
  totalViews: number;
  totalClicks: number;
  links: { id: string; label: string; totalClicks: number }[];
};

const getApiBaseUrl = () =>
  process.env.LINKTREE_API_URL ??
  process.env.NEXT_PUBLIC_LINKTREE_API_URL ??
  'http://localhost:4000';

async function getAnalytics(username: string): Promise<AnalyticsResponse> {
  const response = await fetch(`${getApiBaseUrl()}/analytics/${username}`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function LinktreeAnalyticsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const analytics = await getAnalytics(username);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        {analytics.username}&apos;s Analytics
      </h1>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Views</p>
          <p className="text-2xl font-semibold">{analytics.totalViews}</p>
        </div>
        <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Clicks</p>
          <p className="text-2xl font-semibold">{analytics.totalClicks}</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-semibold">Clicks by Link</h2>
        <ul className="space-y-3">
          {analytics.links.map((link) => (
            <li key={link.id} className="flex items-center justify-between text-sm sm:text-base">
              <span>{link.label}</span>
              <span className="font-semibold">{link.totalClicks}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
