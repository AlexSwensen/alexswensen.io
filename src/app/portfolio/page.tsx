'use client';

import { useState } from 'react';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>('all');
  const allTechnologies = Array.from(new Set(portfolioItems.flatMap((item) => item.technologies)));

  const filteredItems =
    filter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.technologies.includes(filter));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded-full ${
              filter === tech
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const hasProjectUrl = item.projectUrl && item.projectUrl !== '#';
  const hasGithubUrl = item.githubUrl && item.githubUrl !== '#';

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <div className="aspect-video relative">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/portfolio/fallback.svg';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        {(hasProjectUrl || hasGithubUrl) && (
          <div className="flex gap-2">
            {hasProjectUrl && item.projectUrl && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link
                  href={item.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Project
                </Link>
              </Button>
            )}
            {hasGithubUrl && item.githubUrl && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
