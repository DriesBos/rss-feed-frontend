'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

export default function ArticleList() {
  const { api } = useAuth();
  const { articles, setArticles, selectedArticle, setSelectedArticle } = useApp();

  const markAllAsRead = async () => {
    if (!api) return;
    
    try {
      for (const article of articles) {
        if (!article.read) {
          await api.markAsRead(article.id);
        }
      }
      // Update local state
      setArticles(articles.map(a => ({ ...a, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleArticleClick = async (article: any) => {
    setSelectedArticle(article);
    
    // Auto-mark as read when clicking
    if (!article.read && api) {
      try {
        await api.markAsRead(article.id);
        const updatedArticle = { ...article, read: true };
        setArticles(articles.map(a => a.id === article.id ? updatedArticle : a));
        setSelectedArticle(updatedArticle);
      } catch (err) {
        console.error('Failed to mark as read:', err);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getFeedTitle = (article: any) => {
    const category = article.categories?.find((c: string) => c.includes('user/') && c.includes('/label/'));
    if (category) {
      return category.split('/label/')[1];
    }
    return 'Unknown Feed';
  };

  // Check if article is read based on categories
  const isArticleRead = (article: any) => {
    return article.categories?.some((c: string) => c.includes('user/-/state/com.google/read')) || article.read;
  };

  // Check if article is starred
  const isArticleStarred = (article: any) => {
    return article.categories?.some((c: string) => c.includes('user/-/state/com.google/starred')) || article.starred;
  };

  return (
    <section style={{ flex: 1, borderRight: '1px solid #ccc', padding: '15px', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Articles</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={markAllAsRead} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Mark all as read
          </button>
          <button onClick={() => window.location.reload()} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>
      </div>

      {articles.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          <p>No articles to display.</p>
          <p style={{ fontSize: '14px' }}>Add some feeds to get started!</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {articles.map((article) => {
            const isRead = isArticleRead(article);
            const isStarred = isArticleStarred(article);
            
            return (
              <li 
                key={article.id}
                onClick={() => handleArticleClick(article)}
                style={{ 
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  backgroundColor: selectedArticle?.id === article.id ? '#e0e0e0' : (isRead ? '#f9f9f9' : 'white'),
                  fontWeight: isRead ? 'normal' : 'bold'
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                  {article.title}
                </h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
                  {typeof article.summary === 'string' ? article.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No preview available'}
                </p>
                <div style={{ fontSize: '12px', color: '#999', fontWeight: 'normal' }}>
                  <span>{getFeedTitle(article)}</span>
                  <span style={{ margin: '0 8px' }}>•</span>
                  <span>{formatDate(article.published)}</span>
                  {isStarred && <span style={{ marginLeft: '8px' }}>⭐</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

