import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { LinkEntity } from './link.entity';

export type AnalyticsEventType = 'view' | 'click';

@Entity({ name: 'analytics_events' })
export class AnalyticsEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  eventType!: AnalyticsEventType;

  @Column({ type: 'text', nullable: true })
  referrer!: string | null;

  @Column({ type: 'text', nullable: true })
  userAgent!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ProfileEntity, (profile) => profile.analyticsEvents, {
    onDelete: 'CASCADE',
  })
  profile!: ProfileEntity;

  @ManyToOne(() => LinkEntity, (link) => link.analyticsEvents, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  link!: LinkEntity | null;
}
