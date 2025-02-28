import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function ContactCTA() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-8 md:p-12 shadow-xl overflow-hidden border border-blue-100/20 dark:border-slate-700/50">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(100,100,255,0.15),transparent_50%)]" />
        <div className="relative">
          {siteConfig.availability.isAvailableForWork && (
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-6 ring-1 ring-green-500/20 dark:ring-green-500/30">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 dark:bg-green-500"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {siteConfig.availability.message}
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Have a project in mind or want to discuss opportunities? I&apos;m always open to new
            challenges and collaborations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="mailto:alex@alexswensen.io"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
            >
              Send me an email
            </Link>
            <Link
              href="https://www.linkedin.com/in/alexswensen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-slate-900 dark:text-white ring-1 ring-slate-900/10 dark:ring-white/20 hover:bg-white/20 dark:hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
            >
              Connect on LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
