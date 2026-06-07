import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LinkEntity } from './link.entity';
import { AnalyticsEventEntity } from './analytics-event.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  displayName!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string | null;

  @Column({ type: 'text', nullable: true })
  avatarUrl!: string | null;

  @OneToMany(() => LinkEntity, (link) => link.profile)
  links!: LinkEntity[];

  @OneToMany(() => AnalyticsEventEntity, (event) => event.profile)
  analyticsEvents!: AnalyticsEventEntity[];
}
