import type axios from 'axios';

import type { NewsItem, ProfileResponse } from '@/api/types';
import type { Category } from '@/api/types/index';

export type MainApi = {
  init(): Promise<ProfileResponse>;
  getCategories(): Promise<Category[]>;
  sendCategories(categories: Category[]): Promise<void>;
  getSelectedCategories(): Promise<Category[]>;
  getTopNews(category: string): Promise<NewsItem[]>;
}

export class MainApiImpl implements MainApi {
  constructor(private readonly api: typeof axios) {}

  async init(): Promise<ProfileResponse> {
    const { data } = await this.api.get<ProfileResponse>('api/profile');
    return data;
  }

  async getCategories(): Promise<Category[]> {
    const { data } = await this.api.get<Category[]>('api/available_categories');
    return data;
  }

  async sendCategories(categories: Category[]): Promise<void> {
    const categoryIds = categories.map((cat) => cat.category);
    await this.api.post('api/categories', categoryIds);
  }

  async getSelectedCategories(): Promise<Category[]> {
    const { data } = await this.api.get<Category[]>('api/user_categories');
    return data;
  }

  async getTopNews(category: string): Promise<NewsItem[]> {
    const { data } = await this.api.get<NewsItem[]>(`api/top_news/${category}`);
    return data;
  }
}
