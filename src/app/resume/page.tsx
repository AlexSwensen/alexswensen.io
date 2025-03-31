'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/data/resume-data';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Building } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto py-5 px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-primary">{resumeData.name}</h1>
        <h2 className="text-xl text-muted-foreground mb-6">{resumeData.title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Bio Section */}
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary">About Me</h3>
            <p className="text-muted-foreground">{resumeData.bio}</p>
          </motion.section>

          {/* Work Experience */}
          <section className="mb-8">
            <motion.h3
              className="text-2xl font-semibold mb-4 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Work Experience
            </motion.h3>
            <div className="space-y-6">
              {resumeData.workExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h4 className="text-lg font-semibold">{job.position}</h4>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {job.startDate} - {job.endDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-4">
                        <Building className="h-4 w-4 mr-1" />
                        <span>
                          {job.company}, {job.location}
                        </span>
                      </div>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge variant="outline" className="bg-secondary/30">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {job.duties && job.duties.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          {job.duties.map((duty, dutyIndex) => (
                            <li key={dutyIndex}>{duty}</li>
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
            <h3 className="text-2xl font-semibold mb-4 text-primary">Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        <span>
                          {edu.institution}, {edu.location}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
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
        >
          {/* Contact Information */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Contact Information</h3>
              <div className="space-y-3">
                {Object.entries(resumeData.contact).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {key === 'email' && <Mail className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {key === 'phone' && <Phone className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {key === 'location' && (
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    {key === 'website' && <Globe className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {key === 'linkedin' && (
                      <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    {key === 'github' && <Github className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {key === 'email' ? (
                      <a
                        href={`mailto:${value}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : key === 'phone' ? (
                      <a
                        href={`tel:${value}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : key === 'website' || key === 'linkedin' || key === 'github' ? (
                      <a
                        href={`https://${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm">{value}</span>
                    )}
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
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge className="bg-primary/10 text-primary border-primary/20">
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
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Certifications</h3>
                <div className="space-y-3">
                  {resumeData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="border-b border-border pb-2 last:border-0 last:pb-0"
                      whileHover={{ x: 5 }}
                    >
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {cert.name}
                      </a>
                      <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                      <div className="text-xs text-muted-foreground">{cert.date}</div>
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
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Languages</h3>
                <div className="space-y-2">
                  {resumeData.languages.map((language, index) => (
                    <motion.div key={index} className="flex justify-between" whileHover={{ x: 5 }}>
                      <span>{language.name}</span>
                      <span className="text-muted-foreground">{language.proficiency}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
