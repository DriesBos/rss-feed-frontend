interface ArticleListProps {
  // Add your props here
}

export default function ArticleList({}: ArticleListProps) {
  return (
    <section className="article-list">
      <div className="article-list__header">
        <h2 className="article-list__title">All Articles</h2>
        <div className="article-list__controls">
          <button className="article-list__button">Mark all as read</button>
          <button className="article-list__button">Refresh</button>
        </div>
      </div>

      <ul className="article-list__items">
        {/* Article items will go here */}
        <li className="article-list__item article-list__item--unread">
          <div className="article-list__item-content">
            <h3 className="article-list__item-title">
              Example Article Title Goes Here
            </h3>
            <p className="article-list__item-excerpt">
              This is a preview of the article content. It gives readers a quick overview of what the article is about...
            </p>
            <div className="article-list__item-meta">
              <span className="article-list__item-source">Example Feed</span>
              <span className="article-list__item-date">2 hours ago</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

