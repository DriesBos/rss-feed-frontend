import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="navigation">
      <div className="navigation__container">
        <Link href="/" className="navigation__logo">
          RSS Reader
        </Link>

        <nav className="navigation__menu">
          <Link href="/feeds" className="navigation__link">
            Feeds
          </Link>
          <Link href="/favorites" className="navigation__link">
            Favorites
          </Link>
          <Link href="/settings" className="navigation__link">
            Settings
          </Link>
        </nav>

        <div className="navigation__user">
          <button className="navigation__button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

