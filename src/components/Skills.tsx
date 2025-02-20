import { Code, Database, Globe, Server } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  description: string;
}

const skills: Skill[] = [
  {
    name: 'Frontend Development',
    icon: Globe,
    description: 'React, Next.js, Vue.js, Svelte',
  },
  {
    name: 'Backend Development',
    icon: Server,
    description: 'AWS, Vercel, Node.js, Express, Django',
  },
  {
    name: 'Database Management',
    icon: Database,
    description: 'SQL, MongoDB, PostgreSQL',
  },
  {
    name: 'Languages',
    icon: Code,
    description: 'Typescript, JavaScript, Python, Go',
  },
];

const Skills = () => {
  return (
    <section id="skills" className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div key={skill.name} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <IconComponent className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                <h3 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                  {skill.name}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
