const FRESHRSS_API_URL = process.env.NEXT_PUBLIC_FRESHRSS_URL || 'http://localhost:8080';

interface LoginResponse {
  auth: string;
}

interface Feed {
  id: string;
  title: string;
  url: string;
  htmlUrl: string;
  iconUrl?: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  author: string;
  published: number;
  canonical: {
    href: string;
  }[];
  categories: string[];
}

export class FreshRSSAPI {
  private authToken: string | null = null;

  constructor(authToken?: string) {
    if (authToken) {
      this.authToken = authToken;
    }
  }

  // Authentication
  async login(username: string, password: string): Promise<string> {
    const response = await fetch(`${FRESHRSS_API_URL}/api/greader.php/accounts/ClientLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `Email=${encodeURIComponent(username)}&Passwd=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const text = await response.text();
    const authMatch = text.match(/Auth=(.*)/);
    
    if (!authMatch) {
      throw new Error('Invalid response from server');
    }

    this.authToken = authMatch[1];
    return this.authToken;
  }

  // Get all feeds (subscriptions)
  async getFeeds(): Promise<Feed[]> {
    if (!this.authToken) throw new Error('Not authenticated');

    const response = await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/subscription/list?output=json`,
      {
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch feeds');

    const data = await response.json();
    return data.subscriptions || [];
  }

  // Get articles from a feed or category
  async getArticles(streamId: string = 'user/-/state/com.google/reading-list', limit: number = 20): Promise<Article[]> {
    if (!this.authToken) throw new Error('Not authenticated');

    const response = await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/stream/contents/${encodeURIComponent(streamId)}?n=${limit}&output=json`,
      {
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch articles');

    const data = await response.json();
    return data.items || [];
  }

  // Mark article as read
  async markAsRead(articleId: string): Promise<void> {
    if (!this.authToken) throw new Error('Not authenticated');

    await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/edit-tag`,
      {
        method: 'POST',
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `i=${encodeURIComponent(articleId)}&a=user/-/state/com.google/read`,
      }
    );
  }

  // Mark article as unread
  async markAsUnread(articleId: string): Promise<void> {
    if (!this.authToken) throw new Error('Not authenticated');

    await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/edit-tag`,
      {
        method: 'POST',
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `i=${encodeURIComponent(articleId)}&r=user/-/state/com.google/read`,
      }
    );
  }

  // Star/favorite an article
  async starArticle(articleId: string): Promise<void> {
    if (!this.authToken) throw new Error('Not authenticated');

    await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/edit-tag`,
      {
        method: 'POST',
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `i=${encodeURIComponent(articleId)}&a=user/-/state/com.google/starred`,
      }
    );
  }

  // Add a new feed
  async addFeed(feedUrl: string): Promise<void> {
    if (!this.authToken) throw new Error('Not authenticated');

    await fetch(
      `${FRESHRSS_API_URL}/api/greader.php/reader/api/0/subscription/quickadd`,
      {
        method: 'POST',
        headers: {
          'Authorization': `GoogleLogin auth=${this.authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `quickadd=${encodeURIComponent(feedUrl)}`,
      }
    );
  }

  // Get auth token
  getAuthToken(): string | null {
    return this.authToken;
  }
}

// Export a singleton instance
export const freshRSSAPI = new FreshRSSAPI();

