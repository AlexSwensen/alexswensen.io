import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
  ) {}

  async getPublicProfile(username: string): Promise<{
    id: string;
    username: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    links: { id: string; label: string; url: string }[];
  }> {
    const profile = await this.profilesRepository.findOne({
      where: { username },
      relations: ['links'],
      order: { links: { order: 'ASC' } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
      links: profile.links.map((link) => ({
        id: link.id,
        label: link.label,
        url: link.url,
      })),
    };
  }
}
