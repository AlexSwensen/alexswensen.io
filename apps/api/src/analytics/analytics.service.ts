import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEventEntity } from '../entities/analytics-event.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { LinkEntity } from '../entities/link.entity';
import { CreateAnalyticsEventDto } from './dto/create-analytics-event.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEventEntity)
    private readonly analyticsRepository: Repository<AnalyticsEventEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profilesRepository: Repository<ProfileEntity>,
    @InjectRepository(LinkEntity)
    private readonly linksRepository: Repository<LinkEntity>,
  ) {}

  async createEvent(
    createEventDto: CreateAnalyticsEventDto,
    userAgent?: string,
  ) {
    const profile = await this.profilesRepository.findOne({
      where: { username: createEventDto.username },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    let link: LinkEntity | null = null;

    if (createEventDto.eventType === 'click') {
      if (!createEventDto.linkId) {
        throw new BadRequestException('linkId is required for click events');
      }

      link = await this.linksRepository.findOne({
        where: {
          id: createEventDto.linkId,
          profile: { id: profile.id },
        },
        relations: ['profile'],
      });

      if (!link) {
        throw new NotFoundException('Link not found');
      }
    }

    const event = this.analyticsRepository.create({
      eventType: createEventDto.eventType,
      referrer: createEventDto.referrer ?? null,
      userAgent: userAgent ?? null,
      profile,
      link,
    });

    await this.analyticsRepository.save(event);

    return { ok: true };
  }

  async getProfileSummary(username: string): Promise<{
    username: string;
    totalViews: number;
    totalClicks: number;
    links: { id: string; label: string; totalClicks: number }[];
  }> {
    const profile = await this.profilesRepository.findOne({
      where: { username },
      relations: ['links'],
      order: { links: { order: 'ASC' } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const events = await this.analyticsRepository.find({
      where: { profile: { id: profile.id } },
      relations: ['link'],
    });

    const totalViews = events.filter(
      (event) => event.eventType === 'view',
    ).length;
    const totalClicks = events.filter(
      (event) => event.eventType === 'click',
    ).length;

    const clickCountByLink = new Map<string, number>();
    for (const event of events) {
      if (event.eventType !== 'click' || !event.link) {
        continue;
      }

      const currentCount = clickCountByLink.get(event.link.id) ?? 0;
      clickCountByLink.set(event.link.id, currentCount + 1);
    }

    return {
      username: profile.username,
      totalViews,
      totalClicks,
      links: profile.links.map((link) => ({
        id: link.id,
        label: link.label,
        totalClicks: clickCountByLink.get(link.id) ?? 0,
      })),
    };
  }
}
