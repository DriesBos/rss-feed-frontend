'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

export default function ArticleView() {
  const { api } = useAuth();
  const { selectedArticle, setSelectedArticle, articles, setArticles } = useApp();

  if (!selectedArticle) {
    return (
      <article style={{ flex: 1, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <h2>No article selected</h2>
          <p>Select an article from the list to read it here.</p>
        </div>
      </article>
    );
  }

  // Check if article is starred based on categories
  const isStarred = selectedArticle.categories?.some((c: string) => 
    c.includes('user/-/state/com.google/starred')
  ) || selectedArticle.starred;

  // Check if article is read based on categories
  const isRead = selectedArticle.categories?.some((c: string) => 
    c.includes('user/-/state/com.google/read')
  ) || selectedArticle.read;

  const toggleFavorite = async () => {
    if (!api) return;
    
    try {
      if (isStarred) {
        // Note: FreshRSS API doesn't have unstar in the basic implementation
        // You might need to implement this if needed
        console.log('Unstar not implemented in basic API');
      } else {
        await api.starArticle(selectedArticle.id);
        const updatedArticle = { 
          ...selectedArticle, 
          starred: true,
          categories: [...(selectedArticle.categories || []), 'user/-/state/com.google/starred']
        };
        setSelectedArticle(updatedArticle);
        setArticles(articles.map(a => a.id === selectedArticle.id ? updatedArticle : a));
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  const toggleRead = async () => {
    if (!api) return;
    
    try {
      if (isRead) {
        await api.markAsUnread(selectedArticle.id);
        const updatedArticle = { 
          ...selectedArticle, 
          read: false,
          categories: selectedArticle.categories?.filter((c: string) => 
            !c.includes('user/-/state/com.google/read')
          ) || []
        };
        setSelectedArticle(updatedArticle);
        setArticles(articles.map(a => a.id === selectedArticle.id ? updatedArticle : a));
      } else {
        await api.markAsRead(selectedArticle.id);
        const updatedArticle = { 
          ...selectedArticle, 
          read: true,
          categories: [...(selectedArticle.categories || []), 'user/-/state/com.google/read']
        };
        setSelectedArticle(updatedArticle);
        setArticles(articles.map(a => a.id === selectedArticle.id ? updatedArticle : a));
      }
    } catch (err) {
      console.error('Failed to toggle read status:', err);
    }
  };

  const openOriginal = () => {
    const url = selectedArticle.canonical?.[0]?.href;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article style={{ flex: 1, padding: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          {selectedArticle.title}
        </h1>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          <span>{formatDate(selectedArticle.published)}</span>
          {selectedArticle.author && (
            <>
              <span style={{ margin: '0 8px' }}>•</span>
              <span>By {selectedArticle.author}</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={toggleFavorite}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            {isStarred ? '⭐ Favorited' : '☆ Favorite'}
          </button>
          <button 
            onClick={toggleRead}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            {isRead ? '✓ Read' : 'Mark as read'}
          </button>
          <button 
            onClick={openOriginal}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            🔗 Open original
          </button>
        </div>
      </div>

      <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
        <div dangerouslySetInnerHTML={{ __html: selectedArticle.summary }} />
      </div>
    </article>
  );
}

