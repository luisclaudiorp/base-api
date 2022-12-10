import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../Services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags("app")
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
