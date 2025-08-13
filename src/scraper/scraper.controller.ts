import { Controller, Post, Body } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post('scrape')
  async scrape(@Body('url') url: string) {
    if (!url) {
      return { error: 'Please provide a valid URL' };
    }
    const result = await this.scraperService.scrapeAndSave(url);
    return { message: result };
  }
}
