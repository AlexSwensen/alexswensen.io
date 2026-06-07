import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { LinkEntity } from './entities/link.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
    @InjectRepository(LinkEntity)
    private readonly linksRepository: Repository<LinkEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const profileCount = await this.profilesRepository.count();
    if (profileCount > 0) {
      return;
    }

    const profile = this.profilesRepository.create({
      username: 'alex',
      displayName: 'Alexander Swensen',
      bio: 'Software Engineer | Building web products',
      avatarUrl: 'https://alexswensen.io/img/me.jpeg',
    });

    await this.profilesRepository.save(profile);

    const links = this.linksRepository.create([
      {
        label: 'Portfolio',
        url: 'https://alexswensen.io',
        order: 1,
        profile,
      },
      {
        label: 'Blog',
        url: 'https://alexswensen.io/blog',
        order: 2,
        profile,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/AlexSwensen',
        order: 3,
        profile,
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/alexswensen/',
        order: 4,
        profile,
      },
    ]);

    await this.linksRepository.save(links);
  }
}
