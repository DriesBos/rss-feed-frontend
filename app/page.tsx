import Navigation from '@/components/Navigation';
import FeedList from '@/components/FeedList';
import ArticleList from '@/components/ArticleList';
import ArticleView from '@/components/ArticleView';

export default function Home() {
  return (
    <div className="app">
      <Navigation />
      <main className="app__main">
        <FeedList />
        <ArticleList />
        <ArticleView />
      </main>
    </div>
  );
}
