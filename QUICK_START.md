# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Two terminal windows or tabs

---

## 🎯 Start the Application

### Terminal 1: Start Backend
```bash
cd /workspaces/Truth-Shield/backend
npm run dev
```
✅ Backend will be running at: **http://localhost:5000**

### Terminal 2: Start Frontend
```bash
cd /workspaces/Truth-Shield/frontend
npm run dev
```
✅ Frontend will be running at: **http://localhost:3000**

---

## ✅ Verify Integration

Run the integration test:
```bash
bash /workspaces/Truth-Shield/test-integration.sh
```

You should see:
```
================================
Integration Status: ✅ OPERATIONAL
================================
```

---

## 🔐 Login to the Application

1. Open **http://localhost:3000** in your browser
2. Click "Sign up" to create a new account OR use demo credentials:
   - **Email**: demo@truthshield.ai
   - **Password**: demo123

---

## 🎮 Available Features

Once logged in, you can:

### 🔗 URL Scanner
- Scan URLs for phishing, malware, and scams
- Get threat score and trust analysis
- View HTTPS validation status

### 💬 Message Scanner
- Scan text messages for phishing attempts
- Detect scam patterns and suspicious language
- Get confidence scores

### 🎥 Deepfake Scanner
- Upload images/videos
- Detect deepfakes and manipulated media
- Get authenticity scores

### 📰 News Verifier
- Verify news headlines and articles
- Check for misinformation
- Get verification status

### 📊 Analytics Dashboard
- View threat trends (7-day chart)
- Track threat distribution
- Monitor scanner accuracy
- Check security statistics

### 🔔 Alerts
- View real-time security alerts
- Filter by severity (critical, high, medium, low)
- Mark alerts as read
- Delete alerts

### 📜 Scan History
- View all past scans
- Filter by type and result
- Download scan reports

---

## 🔧 Common Commands

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint code
npm run lint
```

### Backend
```bash
cd backend

# Development (auto-restart on file changes)
npm run dev

# Start production
npm start

# Generate mock data
npm run seed
```

---

## 📱 API Endpoints Quick Reference

### Core Operations
```
POST   /api/auth/login           → User login
POST   /api/auth/signup          → User registration
POST   /api/scan/url             → Scan URL
POST   /api/scan/message         → Scan message
POST   /api/scan/deepfake        → Scan deepfake
POST   /api/scan/news            → Verify news
GET    /api/scan/history         → Get scan history
GET    /api/analytics/dashboard  → Dashboard data
GET    /api/alerts               → Get alerts
```

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- Clear browser cache and reload

### Port already in use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

### Build errors
```bash
# Clear next cache
rm -rf frontend/.next

# Reinstall dependencies
cd frontend && rm -rf node_modules && npm install
```

---

## 📊 Current System Status

| Component | Status | Port | URL |
|-----------|--------|------|-----|
| Frontend | ✅ Running | 3000 | http://localhost:3000 |
| Backend | ✅ Running | 5000 | http://localhost:5000 |
| Database | 📝 Mock Data | - | In-Memory |

---

## 💡 What's Been Fixed

✅ **Backend API Response Format** - All endpoints now return consistent JSON structure
✅ **Frontend Build Issues** - TypeScript and JSX syntax errors resolved
✅ **CSS Module Support** - Added type definitions for CSS imports
✅ **API Client Integration** - Added request/response interceptors
✅ **Environment Configuration** - Created .env files for both services
✅ **Type Safety** - Proper TypeScript configuration for Next.js 14

---

## 🎯 Next: Test It Out!

1. Open http://localhost:3000 in your browser
2. Try signing up with a new account
3. Test URL scanning with: `https://example.com`
4. Check the dashboard for analytics
5. View scan history and alerts

---

## 📞 Support

For issues or questions:
1. Check the integration test: `bash test-integration.sh`
2. Review logs in the terminal windows
3. Check STATUS_REPORT.md for detailed information
4. Review INTEGRATION_FIXES.md for technical details

---

**Happy Testing! 🎉**
