export type Category = {
    category: string;
    category_name: string;
  };

export type ProfileResponse = {
    user_categories: Category[];
  };

export type NewsItem = {
    channel_name: string;
    link: string;
    profile_photo_url: string;
    text: string;
    timestamp: string;
  };

export type ProfileData = {
    user_categories: string[];
  }
