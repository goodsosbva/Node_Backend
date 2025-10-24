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

  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));
    return this.configService.get<string>('dbInfo') ?? 'dbInfo not found';
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('server-url')
  getServerUrl(): string {
    return (
      this.configService.get<string>('SERVER_URL') ?? 'SERVER_URL not found'
    );
  }
}
