import { NewsRepository } from '../repositories/news/NewsRepository';
import { INews } from '../models/news/newsModel';

export class NewsService {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async refreshNews(articles: INews[]): Promise<void> {
    const filteredArticles = articles.filter(
      (article) => article.urlToImage !== null
    );

    await this.newsRepository.deleteAllNews();

    await this.newsRepository.saveNews(filteredArticles);
  }

  async getAllNews(): Promise<INews[]> {
    return await this.newsRepository.getAllNews();
  }
}
