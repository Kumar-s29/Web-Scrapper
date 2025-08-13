import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

@Injectable()
export class ScraperService {
  async scrapeAndSave(url: string): Promise<string> {
    try {
      // 1️⃣ Fetch HTML content
      const { data } = await axios.get(url);

      // 2️⃣ Load HTML into cheerio
      const $ = cheerio.load(data);

      // 3️⃣ Extract some sample data
      const scrapedData: string[] = [];
      $('h1, h2, p').each((_, el) => {
        scrapedData.push($(el).text().trim());
      });

      // 4️⃣ Save to local file
      fs.writeFileSync(
        'scraped-data.json',
        JSON.stringify(scrapedData, null, 2),
      );

      return 'Data scraped and saved to scraped-data.json';
    } catch (error) {
      console.error('Scraping failed:', error);
      throw new Error('Failed to scrape data');
    }
  }
}
