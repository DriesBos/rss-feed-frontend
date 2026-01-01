# RSS Reader Frontend - Getting Started

## Overview
This is a fully functional RSS reader frontend that connects to your FreshRSS backend. It includes authentication, feed management, and article reading capabilities.

## Features
- ✅ User authentication (login/logout)
- ✅ View all articles or filter by feed
- ✅ Mark articles as read/unread
- ✅ Favorite/star articles
- ✅ Add new RSS feeds
- ✅ Read full articles
- ✅ Open original article links
- ✅ Auto-mark articles as read when viewing

## Setup

### 1. Configure Backend URL
Make sure your FreshRSS backend is accessible. The frontend looks for the backend at:
- **Environment variable**: `NEXT_PUBLIC_FRESHRSS_URL`
- **Default**: `http://localhost:8080`

To set a custom URL, create a `.env.local` file:

```bash
NEXT_PUBLIC_FRESHRSS_URL=https://your-freshrss-backend.com
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

### 4. Build for Production
```bash
npm run build
npm start
```

## Usage

### First Time Setup
1. Navigate to your deployed site or `http://localhost:3000`
2. You'll be redirected to the login page
3. Enter your FreshRSS username and password
4. Click "Login"

### Creating a FreshRSS User
If you don't have a user yet, you need to create one in your FreshRSS backend first:

```bash
# SSH into your server where FreshRSS is running
# Or use the FreshRSS web interface to create a user
```

### Adding Feeds
1. Once logged in, click "+ Add Feed" in the sidebar
2. Enter the RSS feed URL
3. Click "Add"

### Reading Articles
1. Click on any feed in the sidebar to view its articles
2. Click on an article to read it (automatically marks as read)
3. Use the action buttons to:
   - ⭐ Favorite/unfavorite
   - ✓ Mark as read/unread
   - 🔗 Open the original article

### Logout
Click the "Logout" button in the top right corner to sign out.

## Deployment

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the environment variable:
   - `NEXT_PUBLIC_FRESHRSS_URL`: Your FreshRSS backend URL
4. Deploy!

### Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Set the environment variable:
   - `NEXT_PUBLIC_FRESHRSS_URL`: Your FreshRSS backend URL
4. Deploy!

## Notes
- The application uses localStorage to persist authentication
- Simple HTML-only design (no custom CSS beyond inline styles)
- All features connect to real FreshRSS API endpoints
- Supports all standard RSS feed formats via FreshRSS

## Troubleshooting

### "Login failed" error
- Verify your FreshRSS backend is running and accessible
- Check that the `NEXT_PUBLIC_FRESHRSS_URL` is correct
- Ensure CORS is enabled on your FreshRSS backend

### Articles not loading
- Verify you've added RSS feeds to your account
- Check browser console for API errors
- Refresh the page to reload data

### Can't create account
- Accounts must be created in FreshRSS first
- The "Sign up" button is currently just for UI - use FreshRSS CLI or web interface to create users

