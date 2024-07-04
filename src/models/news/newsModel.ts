import { Schema, model, Document } from 'mongoose';

export interface INews extends Document {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
}

const newsSchema = new Schema<INews>({
  source: {
    id: { type: String, default: null },
    name: { type: String, required: true },
  },
  author: { type: String, default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, default: null },
  publishedAt: { type: Date, required: true },
  content: { type: String, default: null },
});

export const News = model<INews>('News', newsSchema);
