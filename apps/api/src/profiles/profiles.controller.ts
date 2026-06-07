import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':username')
  getProfile(@Param('username') username: string) {
    return this.profilesService.getPublicProfile(username);
  }
}
