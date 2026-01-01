# RSS Reader Frontend

Custom Next.js frontend for FreshRSS.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_FRESHRSS_URL=http://localhost:8080
```

For production (Netlify), set:

```bash
NEXT_PUBLIC_FRESHRSS_URL=https://your-freshrss-backend.com
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── Navigation.tsx      # Top navigation
│   ├── FeedList.tsx        # Sidebar feed list
│   ├── ArticleList.tsx     # Middle article list
│   └── ArticleView.tsx     # Right article view
├── lib/                    # Utilities
│   └── freshrss-api.ts     # FreshRSS API client
├── styles/                 # SASS styles
│   ├── _variables.scss     # Variables
│   └── globals.scss        # Global styles
└── package.json
```

## Styling

All components use BEM naming for classes. Style them in your SASS files:

Example:
```scss
.feed-list {
  // Feed list styles

  &__header {
    // Header styles
  }

  &__item {
    // Item styles

    &--active {
      // Active state
    }
  }
}
```

## FreshRSS API

The API client is in `lib/freshrss-api.ts`. Usage:

```typescript
import { freshRSSAPI } from '@/lib/freshrss-api';

// Login
const authToken = await freshRSSAPI.login('admin', 'password');

// Get feeds
const feeds = await freshRSSAPI.getFeeds();

// Get articles
const articles = await freshRSSAPI.getArticles();

// Mark as read
await freshRSSAPI.markAsRead(articleId);
```

## Deployment to Netlify

### Via GitHub

1. Push this frontend folder to GitHub
2. Connect to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_FRESHRSS_URL`: Your FreshRSS backend URL
5. Deploy!

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Development Workflow

1. **Backend**: FreshRSS runs at `localhost:8080`
2. **Frontend**: Next.js runs at `localhost:3000`
3. **SASS**: Auto-compiles on save
4. **API**: Frontend calls FreshRSS API

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SASS/SCSS
- **API Client**: Native Fetch + Axios
- **Deployment**: Netlify

## Next Steps

1. Style the components in `styles/`
2. Implement state management
3. Add authentication flow
4. Connect to FreshRSS API
5. Deploy to Netlify

Happy coding! 🚀
