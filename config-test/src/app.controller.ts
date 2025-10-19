import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get<string>('MESSAGE') || 'Hello World!';
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string {
    const serviceUrl = this.configService.get<string>('SERVICE_URL');
    return serviceUrl || 'SERVICE_URL not found';
  }
}
