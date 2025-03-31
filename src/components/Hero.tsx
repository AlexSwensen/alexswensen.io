'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Hero = () => {
  return (
    <section className="relative">
      <div className="container relative mx-auto px-6 py-16 text-center">
        <motion.div
          className="mx-auto max-w-lg"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Image
              src="/img/me.jpeg?height=150&width=150"
              alt="Alexander Swensen"
              width={150}
              height={150}
              className="mx-auto rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
            />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl"
          >
            Alexander Swensen
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-gray-600 dark:text-gray-300">
            Software Engineer
          </motion.p>
          <motion.p variants={fadeInUp} className="mt-4 text-gray-600 dark:text-gray-300">
            Passionate about building scalable and efficient software solutions. Experienced in
            full-stack development with a focus on modern web technologies.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6 flex justify-center space-x-4">
            <motion.a
              href="https://github.com/AlexSwensen"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="icon" className="cursor-pointer">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/alexswensen"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="icon" className="cursor-pointer">
                <LinkedinIcon className="h-5 w-5" />
              </Button>
            </motion.a>
            <motion.a
              href="https://x.com/alexswensen_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="icon" className="cursor-pointer">
                <TwitterIcon className="h-5 w-5" />
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
