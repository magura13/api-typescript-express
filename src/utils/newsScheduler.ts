import axios from 'axios';
import { NewsService } from '../services/newsService';
import dotenv from 'dotenv';
import { INews } from '../models/news/newsModel';

dotenv.config();

const newsService = new NewsService();

const fetchNews = async () => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const formattedDate = date.toISOString().split('T')[0];

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'technology',
        from: formattedDate,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 25,
      },
    });

    const articles = response.data.articles.map((article: any) => ({
      source: {
        id: article.source.id,
        name: article.source.name,
      },
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      content: article.content,
    })) as INews[];

    await newsService.refreshNews(articles);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

const now = new Date();
const midnight = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1,
  0,
  0,
  0,
  0
);
const msUntilMidnight = midnight.getTime() - now.getTime();

setTimeout(() => {
  fetchNews();
  setInterval(fetchNews, 24 * 60 * 60 * 1000);
}, msUntilMidnight);

fetchNews();
