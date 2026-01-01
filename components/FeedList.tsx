'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

export default function FeedList() {
  const { api } = useAuth();
  const { feeds, setFeeds, selectedFeed, setSelectedFeed, setArticles, showFavorites, setShowFavorites, setSelectedArticle } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addingFeed, setAddingFeed] = useState(false);
  const [newFeedUrl, setNewFeedUrl] = useState('');

  useEffect(() => {
    loadFeeds();
  }, [api]);

  useEffect(() => {
    // Load articles when feed selection changes
    if (api) {
      loadArticles();
    }
  }, [selectedFeed, showFavorites, api]);

  const loadFeeds = async () => {
    if (!api) return;
    
    setLoading(true);
    setError('');
    
    try {
      const fetchedFeeds = await api.getFeeds();
      setFeeds(fetchedFeeds);
    } catch (err) {
      setError('Failed to load feeds');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    if (!api) return;

    try {
      let streamId = 'user/-/state/com.google/reading-list';
      
      if (showFavorites) {
        streamId = 'user/-/state/com.google/starred';
      } else if (selectedFeed) {
        streamId = selectedFeed;
      }
      
      const fetchedArticles = await api.getArticles(streamId, 50);
      setArticles(fetchedArticles);
      setSelectedArticle(null); // Clear selected article when switching feeds
    } catch (err) {
      console.error('Failed to load articles:', err);
    }
  };

  const handleAddFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!api || !newFeedUrl.trim()) return;

    try {
      await api.addFeed(newFeedUrl);
      setNewFeedUrl('');
      setAddingFeed(false);
      await loadFeeds();
    } catch (err) {
      alert('Failed to add feed');
      console.error(err);
    }
  };

  const unreadCount = feeds.reduce((sum, feed) => sum + (feed.unreadCount || 0), 0);

  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ccc', padding: '15px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Feeds</h2>
        {!addingFeed ? (
          <button 
            onClick={() => setAddingFeed(true)}
            style={{ width: '100%', padding: '8px', cursor: 'pointer' }}
          >
            + Add Feed
          </button>
        ) : (
          <form onSubmit={handleAddFeed}>
            <input
              type="url"
              value={newFeedUrl}
              onChange={(e) => setNewFeedUrl(e.target.value)}
              placeholder="Feed URL"
              style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              <button type="submit" style={{ flex: 1, padding: '5px' }}>Add</button>
              <button 
                type="button" 
                onClick={() => { setAddingFeed(false); setNewFeedUrl(''); }}
                style={{ flex: 1, padding: '5px' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {loading && <div>Loading feeds...</div>}

      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li 
            onClick={() => { setSelectedFeed(null); setShowFavorites(false); }}
            style={{ 
              padding: '10px', 
              cursor: 'pointer', 
              backgroundColor: !selectedFeed && !showFavorites ? '#e0e0e0' : 'transparent',
              marginBottom: '5px'
            }}
          >
            <span>📰 All Articles</span>
            {unreadCount > 0 && <span style={{ float: 'right' }}>{unreadCount}</span>}
          </li>
          <li 
            onClick={() => { setSelectedFeed(null); setShowFavorites(true); }}
            style={{ 
              padding: '10px', 
              cursor: 'pointer', 
              backgroundColor: showFavorites ? '#e0e0e0' : 'transparent',
              marginBottom: '15px'
            }}
          >
            <span>⭐ Favorites</span>
          </li>
        </ul>

        <h3 style={{ fontSize: '14px', marginTop: '20px', marginBottom: '10px' }}>Subscriptions</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {feeds.map((feed) => (
            <li 
              key={feed.id}
              onClick={() => { setSelectedFeed(feed.id); setShowFavorites(false); }}
              style={{ 
                padding: '10px', 
                cursor: 'pointer', 
                backgroundColor: selectedFeed === feed.id ? '#e0e0e0' : 'transparent',
                marginBottom: '5px',
                fontSize: '14px'
              }}
            >
              <span>🔖 {feed.title}</span>
            </li>
          ))}
          {feeds.length === 0 && !loading && (
            <li style={{ padding: '10px', color: '#999', fontSize: '14px' }}>
              No feeds yet. Add one above!
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

