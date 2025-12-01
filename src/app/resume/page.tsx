'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/data/resume-data';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  Building,
  Download,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

export default function ResumePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      {/* Hero Header with Enhanced Gradient */}
      <div className="relative py-16 mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 opacity-80"></div>

        {/* Gradient circles for additional color */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-500/20 dark:bg-blue-500/30 blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-40 h-40 rounded-full bg-purple-500/20 dark:bg-purple-500/30 blur-2xl"></div>
        <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full bg-pink-500/20 dark:bg-pink-500/30 blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-3 text-primary">{resumeData.name}</h1>
            <h2 className="text-2xl text-muted-foreground mb-6">{resumeData.title}</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a
                href="#"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume PDF
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Bio Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-5 text-primary flex items-center after:content-[''] after:h-[1px] after:flex-grow after:bg-border after:ml-4">
                About Me
              </h3>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{resumeData.bio}</p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Work Experience */}
            <section className="mb-12">
              <motion.h3
                className="text-2xl font-semibold mb-5 text-primary flex items-center after:content-[''] after:h-[1px] after:flex-grow after:bg-border after:ml-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Work Experience
              </motion.h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:w-[2px] before:bg-border before:h-full">
                {resumeData.workExperience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-primary/10">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                          <h4 className="text-xl font-semibold text-primary">{job.position}</h4>
                          <div className="flex items-center text-muted-foreground text-sm bg-muted py-1 px-3 rounded-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {job.startDate} - {job.endDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-muted-foreground mb-4 font-medium">
                          <Building className="h-4 w-4 mr-2" />
                          <span>
                            {job.company}, {job.location}
                          </span>
                        </div>

                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {job.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skillIndex}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Badge
                                  variant="outline"
                                  className="bg-secondary/20 border-secondary/30 transition-colors hover:bg-secondary/30"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {job.duties && job.duties.length > 0 && (
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground marker:text-primary">
                            {job.duties.map((duty, dutyIndex) => (
                              <li key={dutyIndex} className="leading-relaxed">
                                {duty}
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Education */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-5 text-primary flex items-center after:content-[''] after:h-[1px] after:flex-grow after:bg-border after:ml-4">
                Education
              </h3>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"></div>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-primary">{edu.degree}</h4>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {edu.institution}, {edu.location}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm mt-2 bg-muted py-1 px-3 rounded-full w-fit">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{edu.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Contact Information</h3>
                <div className="space-y-4">
                  {Object.entries(resumeData.contact).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="flex items-center group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 3 }}
                    >
                      <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                        {key === 'email' && <Mail className="h-5 w-5 text-primary" />}
                        {key === 'phone' && <Phone className="h-5 w-5 text-primary" />}
                        {key === 'location' && <MapPin className="h-5 w-5 text-primary" />}
                        {key === 'website' && <Globe className="h-5 w-5 text-primary" />}
                        {key === 'linkedin' && <Linkedin className="h-5 w-5 text-primary" />}
                        {key === 'github' && <Github className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                          {key}
                        </div>
                        {key === 'email' ? (
                          <a
                            href={`mailto:${value}`}
                            className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                          >
                            {value}
                            <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                          </a>
                        ) : key === 'phone' ? (
                          <a
                            href={`tel:${value}`}
                            className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                          >
                            {value}
                            <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                          </a>
                        ) : key === 'website' || key === 'linkedin' || key === 'github' ? (
                          <a
                            href={`https://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                          >
                            {value}
                            <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                          </a>
                        ) : (
                          <span className="text-sm font-medium">{value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-5 text-primary">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                          <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 text-sm">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-5 text-primary">Certifications</h3>
                  <div className="space-y-4">
                    {resumeData.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        className="group border-b border-border pb-3 last:border-0 last:pb-0"
                        whileHover={{ x: 3 }}
                      >
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary transition-colors flex items-center"
                        >
                          {cert.name}
                          <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <div className="text-sm text-muted-foreground mt-1">{cert.issuer}</div>
                        <div className="text-xs bg-muted py-0.5 px-2 rounded-full w-fit mt-2 text-muted-foreground">
                          {cert.date}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-5 text-primary">Languages</h3>
                  <div className="space-y-4">
                    {resumeData.languages.map((language, index) => (
                      <motion.div key={index} className="space-y-1" whileHover={{ x: 3 }}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{language.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {language.proficiency}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500"
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                language.proficiency === 'Native'
                                  ? '100%'
                                  : language.proficiency === 'Fluent'
                                    ? '90%'
                                    : language.proficiency === 'Advanced'
                                      ? '75%'
                                      : language.proficiency === 'Intermediate'
                                        ? '50%'
                                        : '25%',
                            }}
                            transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
