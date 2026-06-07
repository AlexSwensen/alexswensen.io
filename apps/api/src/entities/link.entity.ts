import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { AnalyticsEventEntity } from './analytics-event.entity';

@Entity({ name: 'links' })
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  label!: string;

  @Column()
  url!: string;

  @Column({ default: 0 })
  order!: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.links, {
    onDelete: 'CASCADE',
  })
  profile!: ProfileEntity;

  @OneToMany(() => AnalyticsEventEntity, (event) => event.link)
  analyticsEvents!: AnalyticsEventEntity[];
}
