#!/bin/bash

# Quick script to test the app locally over HTTP (no HTTPS)

echo "Starting RSS Reader on HTTP (port 3000)..."
echo "This allows connection to HTTP backend without mixed content errors"
echo ""
echo "Backend URL: http://18.193.115.236:8080"
echo "Frontend URL: http://localhost:3000"
echo ""

cd /Users/driesbos/Work/rss-feed-project/frontend

# Set the backend URL
export NEXT_PUBLIC_FRESHRSS_URL=http://18.193.115.236:8080

# Run the dev server
npm run dev

