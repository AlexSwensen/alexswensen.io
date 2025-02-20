import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-lg">
          <Image
            src="/img/me.jpeg?height=150&width=150"
            alt="Alexander Swensen"
            width={150}
            height={150}
            className="mx-auto rounded-full"
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Alexander Swensen
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Software Engineer</p>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Passionate about building scalable and efficient software solutions. Experienced in
            full-stack development with a focus on modern web technologies.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a href="https://github.com/AlexSwensen" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="cursor-pointer">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com/in/alexswensen" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="cursor-pointer">
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://x.com/alexswensen_" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="cursor-pointer">
                <TwitterIcon className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
