import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsEventEntity } from '../entities/analytics-event.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { LinkEntity } from '../entities/link.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalyticsEventEntity, ProfileEntity, LinkEntity]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
