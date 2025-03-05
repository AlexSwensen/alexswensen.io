'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
            onClick={closeMenu}
          >
            AlexSwensen.io
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop and Mobile menu */}
          <ul
            className={`md:flex md:space-x-6 md:items-center absolute md:relative top-16 md:top-0 left-0 right-0 bg-background/95 md:bg-transparent p-4 md:p-0 border-b md:border-0 ${
              isMenuOpen ? 'flex' : 'hidden'
            } flex-col md:flex-row space-y-4 md:space-y-0 transition-all duration-200 ease-in-out`}
          >
            <li className="w-full md:w-auto">
              <Link
                href="/"
                className={`block py-3 md:py-0 text-lg md:text-base font-medium transition-colors relative md:px-3 md:py-1 rounded-lg ${
                  isActive('/')
                    ? 'text-primary bg-accent/50 md:bg-transparent md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-0.5 md:after:bg-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent/50 md:hover:bg-accent md:rounded-md'
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                href="/blog"
                className={`block py-3 md:py-0 text-lg md:text-base font-medium transition-colors relative md:px-3 md:py-1 rounded-lg ${
                  isActive('/blog')
                    ? 'text-primary bg-accent/50 md:bg-transparent md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-0.5 md:after:bg-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent/50 md:hover:bg-accent md:rounded-md'
                }`}
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                href="/portfolio"
                className={`block py-3 md:py-0 text-lg md:text-base font-medium transition-colors relative md:px-3 md:py-1 rounded-lg ${
                  isActive('/portfolio')
                    ? 'text-primary bg-accent/50 md:bg-transparent md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-0.5 md:after:bg-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent/50 md:hover:bg-accent md:rounded-md'
                }`}
                onClick={closeMenu}
              >
                Portfolio
              </Link>
            </li>
            {/* <li className="w-full md:w-auto">
              <Link
                href="/contact"
                className={`block py-3 md:py-0 text-lg md:text-base font-medium transition-colors relative md:px-3 md:py-1 rounded-lg ${
                  isActive('/contact')
                    ? 'text-primary bg-accent/50 md:bg-transparent md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-0.5 md:after:bg-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent/50 md:hover:bg-accent md:rounded-md'
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li> */}
            <li className="w-full md:w-auto pt-2 md:pt-0">
              <div className="flex justify-center md:justify-start">
                <ThemeToggle />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
