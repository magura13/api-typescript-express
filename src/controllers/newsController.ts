import { Request, Response } from 'express';
import { NewsService } from '../services/newsService';

const newsService = new NewsService();

export class NewsController {
  static async getNews(req: Request, res: Response) {
    try {
      const news = await newsService.getAllNews();
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  }
}
