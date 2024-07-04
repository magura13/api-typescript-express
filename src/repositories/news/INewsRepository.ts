import { INews } from '../../models/news/newsModel';

export interface INewsRepository {
  saveNews(newsData: INews[]): Promise<void>;
}
