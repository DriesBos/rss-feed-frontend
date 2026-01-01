'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import FeedList from '@/components/FeedList';
import ArticleList from '@/components/ArticleList';
import ArticleView from '@/components/ArticleView';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <main style={{ display: 'flex', gap: '20px', padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <FeedList />
        <ArticleList />
        <ArticleView />
      </main>
    </div>
  );
}
