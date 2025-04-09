import Image from 'next/image';

const benefits = [
  {
    title: 'Full Stack Expertise',
    description:
      'Delivering scalable and maintainable software solutions tailored to business needs.',
    paragraphs: [
      'With over a decade of experience, I specialize in building full-stack applications that are performant, scalable, and maintainable. My expertise spans across AWS cloud infrastructure, serverless applications, and modern frameworks like React, Vue.js, and Svelte. I prioritize clean, well-documented code that follows industry best practices, ensuring long-term sustainability.',
      'I have a deep understanding of backend development, leveraging Node.js, Python, and Go to create reliable and efficient systems. On the frontend, I build intuitive and responsive interfaces using modern frameworks, ensuring seamless user experiences that align with business goals. By integrating CI/CD pipelines and automated testing, I streamline development processes and reduce deployment risks.',
    ],
    image: '/illustrations/undraw_server-cluster_7ugi.svg',
    color: 'from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20',
  },
  {
    title: 'AI-Enhanced Development',
    description:
      'Leveraging artificial intelligence to accelerate development and create smarter solutions.',
    paragraphs: [
      'I integrate AI tools and techniques throughout my development process to enhance productivity and innovation. From using AI-powered code generation and testing to implementing machine learning models for data analysis, I leverage cutting-edge AI technologies to deliver more sophisticated solutions faster.',
      'My expertise includes building AI-enhanced features like intelligent automation, predictive analytics, and natural language processing capabilities. By combining traditional software engineering with modern AI approaches, I create applications that are not just functional but truly intelligent and adaptive to user needs.',
    ],
    image: '/illustrations/undraw_firmware_3fxd.svg',
    color: 'from-indigo-500/10 to-indigo-600/10 dark:from-indigo-500/20 dark:to-indigo-600/20',
  },
  {
    title: 'Performance Optimization',
    description:
      'Building high-performing, cloud-native applications with optimized response times.',
    paragraphs: [
      'Performance is critical to delivering a great user experience and maintaining business efficiency. I focus on optimizing frontend and backend performance through efficient API design, caching mechanisms, and database query optimizations. My experience with AWS Lambda, DynamoDB, and Aurora allows me to build systems that dynamically scale to handle high traffic loads.',
      'I continuously monitor and improve application performance by leveraging modern profiling tools, implementing lazy loading, and fine-tuning server response times. This ensures that applications remain responsive and cost-effective, even as demand fluctuates.',
    ],
    image: '/illustrations/performance.svg',
    color: 'from-yellow-500/10 to-yellow-600/10 dark:from-yellow-500/20 dark:to-yellow-600/20',
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Implementing security best practices to protect applications and user data.',
    paragraphs: [
      'Security is an integral part of my development approach. I design applications with security in mind, ensuring compliance with best practices and industry standards. From implementing OAuth and JWT-based authentication to encrypting sensitive data, I take a proactive approach to safeguarding user information.',
      'I also perform regular security audits and vulnerability assessments to identify and mitigate potential threats. By integrating secure coding principles and access control mechanisms, I build software that not only meets compliance requirements but also fosters user trust and reliability.',
    ],
    image: '/illustrations/security.svg',
    color: 'from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20',
  },
  {
    title: 'Engineering for Business Growth',
    description: 'Bridging the gap between technology and business to drive measurable impact.',
    paragraphs: [
      'Technology should not only solve technical challenges but also drive business growth. I work closely with stakeholders to understand their goals and deliver software that creates real impact. By automating workflows and integrating data-driven insights, I help businesses reduce operational costs and improve decision-making.',
      'My work has contributed to enhancing customer engagement, streamlining internal processes, and scaling digital products to reach wider audiences. By aligning technology with business objectives, I ensure that every project delivers long-term value and measurable success.',
    ],
    image: '/illustrations/business-impact.svg',
    color: 'from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20',
  },
];

const ValueProposition = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            How I Add Value to Your Business
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I combine technical expertise with business acumen to deliver solutions that drive real
            results.
          </p>
        </div>
        <div className="space-y-32">
          {benefits.map((benefit, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {benefit.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex-1 relative h-[500px] w-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-contain"
                    priority={index < 2}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
