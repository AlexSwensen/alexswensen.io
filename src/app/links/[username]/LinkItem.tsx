'use client';

import { trackLinkClick } from '@/components/LinktreeTracker';

type LinkItemProps = {
  apiBaseUrl: string;
  username: string;
  link: {
    id: string;
    label: string;
    url: string;
  };
};

export function LinkItem({ apiBaseUrl, username, link }: LinkItemProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-center font-medium text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      onClick={() => trackLinkClick(apiBaseUrl, username, link.id)}
    >
      {link.label}
    </a>
  );
}
