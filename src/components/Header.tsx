'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            AlexSwensen.io
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
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
            } flex-col md:flex-row space-y-4 md:space-y-0`}
          >
            <li>
              <Link href="/" className="hover:text-primary transition-colors block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors block">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/resume" className="hover:text-primary transition-colors block">
                Resume
              </Link>
            </li>
            {/* <li>
              <Link href="/projects" className="hover:text-primary transition-colors block">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors block">
                Contact
              </Link>
            </li> */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
