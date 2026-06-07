import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsEventDto } from './dto/create-analytics-event.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('events')
  createEvent(
    @Body() createEventDto: CreateAnalyticsEventDto,
    @Req() request: Request,
  ) {
    return this.analyticsService.createEvent(
      createEventDto,
      request.get('user-agent'),
    );
  }

  @Get(':username')
  getSummary(@Param('username') username: string) {
    return this.analyticsService.getProfileSummary(username);
  }
}
