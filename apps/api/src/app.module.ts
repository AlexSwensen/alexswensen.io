import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { ProfileEntity } from './entities/profile.entity';
import { LinkEntity } from './entities/link.entity';
import { AnalyticsEventEntity } from './entities/analytics-event.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseSeedService } from './database-seed.service';

const dbPath = process.env.LINKTREE_DB_PATH ?? 'data/linktree.sqlite';
const shouldSynchronize = process.env.NODE_ENV !== 'production';
mkdirSync(dirname(dbPath), { recursive: true });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: dbPath,
      entities: [ProfileEntity, LinkEntity, AnalyticsEventEntity],
      synchronize: shouldSynchronize,
    }),
    TypeOrmModule.forFeature([ProfileEntity, LinkEntity]),
    ProfilesModule,
    AnalyticsModule,
  ],
  providers: [DatabaseSeedService],
})
export class AppModule {}
