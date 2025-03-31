import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { resumeData } from '@/data/resume-data';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Building } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-primary">{resumeData.name}</h1>
      <h2 className="text-xl text-muted-foreground mb-6">{resumeData.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Bio Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">About Me</h3>
            <p className="text-muted-foreground">{resumeData.bio}</p>
          </section>

          {/* Work Experience */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Work Experience</h3>
            <div className="space-y-6">
              {resumeData.workExperience.map((job, index) => (
                <Card key={index} className="overflow-hidden">
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
                          <Badge key={skillIndex} variant="outline" className="bg-secondary/30">
                            {skill}
                          </Badge>
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
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <Card key={index}>
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
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          {/* Contact Information */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={`mailto:${resumeData.contact.email}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {resumeData.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={`tel:${resumeData.contact.phone}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {resumeData.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{resumeData.contact.location}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={`https://${resumeData.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {resumeData.contact.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={`https://${resumeData.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {resumeData.contact.linkedin}
                  </a>
                </div>
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a
                    href={`https://${resumeData.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {resumeData.contact.github}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Certifications</h3>
              <div className="space-y-3">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="border-b border-border pb-2 last:border-0 last:pb-0">
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">Languages</h3>
              <div className="space-y-2">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-muted-foreground">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
