# Netlify Deployment Guide

## Quick Deploy to Netlify

### Step 1: Push to GitHub

```bash
cd /Users/driesbos/Work/rss-feed-project

# Initialize git for frontend (if not already)
cd frontend
git init
git add .
git commit -m "Initial frontend setup"

# Create repo on GitHub (github.com/new)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/rss-reader-frontend.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your `rss-reader-frontend` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Branch**: `main`

### Step 3: Add Environment Variables

In Netlify dashboard → Site settings → Environment variables:

```bash
NEXT_PUBLIC_FRESHRSS_URL=https://your-freshrss-backend.com
```

### Step 4: Deploy!

Click "Deploy site" - Netlify will:
- Install dependencies
- Build your Next.js app
- Deploy to CDN
- Give you a URL: `https://your-site.netlify.app`

---

## Automatic Deployments

Every time you push to GitHub, Netlify auto-deploys!

```bash
# Make changes
git add .
git commit -m "Update styling"
git push

# Netlify automatically rebuilds and deploys
```

---

## Custom Domain (Optional)

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Netlify: Site settings → Domain management
3. Add custom domain
4. Update DNS records (Netlify provides instructions)
5. Enable HTTPS (automatic with Let's Encrypt)

---

## Netlify Configuration File

Create `netlify.toml` in frontend root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Backend Setup (FreshRSS on DigitalOcean)

Your FreshRSS backend needs to:

1. **Be publicly accessible** (not localhost)
2. **Allow CORS** from your Netlify domain
3. **Have HTTPS enabled**

### Enable CORS in FreshRSS

SSH into your DigitalOcean droplet:

```bash
# Add CORS headers
docker-compose exec freshrss-app bash -c "echo 'Header set Access-Control-Allow-Origin \"https://your-site.netlify.app\"' >> /etc/apache2/apache2.conf"

# Restart
docker-compose restart freshrss-app
```

---

## Full Architecture

```
┌─────────────────────────────────────┐
│  User visits:                       │
│  https://your-site.netlify.app      │
│  ↓                                  │
│  Netlify (Frontend CDN)             │
│  - Serves Next.js static files     │
│  - Fast, global CDN                │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│  FreshRSS Backend:                  │
│  https://your-droplet.com           │
│  - DigitalOcean Droplet            │
│  - Docker + FreshRSS               │
│  - PostgreSQL                       │
└─────────────────────────────────────┘
```

---

## Cost Breakdown

- **Frontend (Netlify)**: FREE (100GB bandwidth/month)
- **Backend (DigitalOcean)**: $6-12/month
- **Domain (optional)**: ~$12/year
- **Total**: As low as $6/month!

---

## Testing Before Deploy

```bash
cd /Users/driesbos/Work/rss-feed-project/frontend

# Build locally
npm run build

# Test production build
npm start

# Access at http://localhost:3000
```

---

## Troubleshooting

### Build fails on Netlify?

Check Netlify build logs for errors. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### API calls fail?

- Check `NEXT_PUBLIC_FRESHRSS_URL` environment variable
- Verify CORS is enabled on backend
- Check Network tab in browser DevTools

### Frontend shows but API doesn't work?

- Make sure FreshRSS is publicly accessible
- Test API directly: `curl https://your-backend.com/api/greader.php/...`
- Check browser console for CORS errors

---

## Deploy from CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd /Users/driesbos/Work/rss-feed-project/frontend
netlify init
netlify deploy --prod
```

---

## Next Steps After Deploy

1. ✅ Frontend deployed to Netlify
2. ✅ Backend running on DigitalOcean
3. ✅ Connect them via API
4. ✅ Add custom domain (optional)
5. ✅ Enable HTTPS (automatic on Netlify)
6. ✅ Share with users!

---

**Your frontend will be live in ~2 minutes after pushing to GitHub!** 🚀

