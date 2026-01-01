'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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
  read?: boolean;
  starred?: boolean;
}

interface Feed {
  id: string;
  title: string;
  url: string;
  htmlUrl: string;
  iconUrl?: string;
  unreadCount?: number;
}

interface AppContextType {
  selectedFeed: string | null;
  setSelectedFeed: (feedId: string | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  feeds: Feed[];
  setFeeds: (feeds: Feed[]) => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  selectedFeed: null,
  setSelectedFeed: () => {},
  selectedArticle: null,
  setSelectedArticle: () => {},
  feeds: [],
  setFeeds: () => {},
  articles: [],
  setArticles: () => {},
  showFavorites: false,
  setShowFavorites: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedFeed,
        setSelectedFeed,
        selectedArticle,
        setSelectedArticle,
        feeds,
        setFeeds,
        articles,
        setArticles,
        showFavorites,
        setShowFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export type { Article, Feed };

