interface FeedListProps {
  // Add your props here
}

export default function FeedList({}: FeedListProps) {
  return (
    <aside className="feed-list">
      <div className="feed-list__header">
        <h2>Feeds</h2>
        <button className="feed-list__add-button">+ Add Feed</button>
      </div>

      <nav className="feed-list__nav">
        <ul className="feed-list__items">
          <li className="feed-list__item feed-list__item--active">
            <span className="feed-list__item-icon">📰</span>
            <span className="feed-list__item-title">All Articles</span>
            <span className="feed-list__item-count">42</span>
          </li>
          <li className="feed-list__item">
            <span className="feed-list__item-icon">⭐</span>
            <span className="feed-list__item-title">Favorites</span>
            <span className="feed-list__item-count">12</span>
          </li>
        </ul>

        <div className="feed-list__section">
          <h3 className="feed-list__section-title">Subscriptions</h3>
          <ul className="feed-list__items">
            {/* Feed items will go here */}
            <li className="feed-list__item">
              <span className="feed-list__item-icon">🔖</span>
              <span className="feed-list__item-title">Example Feed</span>
              <span className="feed-list__item-count">5</span>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

