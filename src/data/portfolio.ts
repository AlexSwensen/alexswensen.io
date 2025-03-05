export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  date: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'alexswensen-io',
    title: 'AlexSwensen.io',
    description: 'My personal website - you are here!',
    imageUrl: '/portfolio/personal-website.png',
    projectUrl: 'https://alexswensen.io',
    githubUrl: 'https://github.com/AlexSwensen/alexswensen.io',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    date: '2024-03-05',
  },
  {
    id: 'innerstrength-tn',
    title: 'InnerStrength TN',
    description: 'A website for a mental health organization',
    imageUrl: '/portfolio/innerstrength-tn.png',
    projectUrl: 'https://innerstrengthtn.com',
    technologies: ['Svelte', 'SvelteKit', 'Tailwind CSS'],
    featured: true,
    date: '2024-03-05',
  },
  // Add more projects here
];
