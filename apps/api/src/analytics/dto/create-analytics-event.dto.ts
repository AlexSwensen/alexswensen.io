import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAnalyticsEventDto {
  @IsIn(['view', 'click'])
  eventType!: 'view' | 'click';

  @IsString()
  username!: string;

  @IsOptional()
  @IsUUID()
  linkId?: string;

  @IsOptional()
  @IsString()
  referrer?: string;
}
