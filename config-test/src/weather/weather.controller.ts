import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    const apiUrl = this.configService.get('WEATHER_API_URL') as string;
    const apiKey = this.configService.get('WEATHER_API_KEY') as string;

    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string): string {
    console.log('weather api call');
    console.log(apiUrl);
    console.log(apiKey);
    return 'tomorrow will be sunny';
  }
}
