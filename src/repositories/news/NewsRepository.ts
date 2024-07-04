import { News, INews } from "../../models/news/newsModel";
import { INewsRepository } from "./INewsRepository";

export class NewsRepository implements INewsRepository {
  
  async deleteAllNews(): Promise<void> {
    try {
      await News.deleteMany({});
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  }

  async saveNews(newsData: INews[]): Promise<void> {
    try {
      await News.insertMany(newsData);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  }

  async getAllNews(): Promise<INews[]> {
    try {
      return await News.find({});
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
}
