# Setup & Installation Guide

## Complete Setup Instructions for TruthShield AI

### Prerequisites
- Node.js 16+ LTS
- npm or yarn
- Git
- Code editor (VS Code recommended)

---

## Frontend Setup (Next.js + React)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configuration Files Created
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `next.config.js` - Next.js configuration
- `app/globals.css` - Global styles with neon effects
- `app/layout.tsx` - Root layout

### Step 3: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Step 4: Frontend Pages Created

#### Public Pages
- **Landing Page** (`app/page.tsx`) - Hero section, features, statistics, CTA
- **Login** (`app/login/page.tsx`) - Authentication
- **Signup** (`app/signup/page.tsx`) - User registration

#### Dashboard Pages (Protected)
- **Dashboard Home** (`app/dashboard/page.tsx`) - Overview with charts and stats
- **URL Scanner** (`app/dashboard/url-scanner/page.tsx`) - Phishing detection
- **Message Scanner** (`app/dashboard/message-scanner/page.tsx`) - Scam detection
- **Deepfake Scanner** (`app/dashboard/deepfake-scanner/page.tsx`) - Media analysis
- **News Scanner** (`app/dashboard/news-scanner/page.tsx`) - Misinformation detection
- **Analytics** (`app/dashboard/analytics/page.tsx`) - Advanced analytics
- **History** (`app/dashboard/history/page.tsx`) - Scan history with filtering
- **Alerts** (`app/dashboard/alerts/page.tsx`) - Alert management

### Frontend Features
✅ Responsive design (mobile, tablet, desktop)
✅ Dark theme with neon accents
✅ Smooth animations and transitions
✅ Interactive charts with Recharts
✅ Sidebar navigation
✅ Authentication flow
✅ Mock data generation
✅ Real-time stats

---

## Backend Setup (Node.js + Express)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configuration Files Created
- `package.json` - Backend dependencies
- `server.js` - Main API server
- `utils/mockData.js` - Sample data generators
- `.env` - Environment variables

### Step 3: Run Development Server
```bash
npm run dev
```

API will run on `http://localhost:5000`

### Step 4: Environment Variables
Create `.env` file:
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Backend API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

#### Scanners
- `POST /api/scan/url` - Scan URL for threats
- `POST /api/scan/message` - Analyze messages for scams
- `POST /api/scan/deepfake` - Detect deepfakes
- `POST /api/scan/news` - Verify news authenticity

#### Scan Data
- `GET /api/scans/history` - Get scan history
- `GET /api/scans/:id` - Get specific scan

#### Analytics
- `GET /api/analytics` - Weekly analytics
- `GET /api/analytics/dashboard` - Dashboard stats

#### Alerts
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts/:id/read` - Mark as read
- `DELETE /api/alerts/:id` - Delete alert

#### Statistics
- `GET /api/stats` - Overall statistics
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user info

### Backend Features
✅ Mock data generation
✅ Authentication endpoints
✅ All scanner APIs
✅ Analytics endpoints
✅ Alert management
✅ CORS enabled
✅ JSON responses
✅ Error handling

---

## Full Application Workflow

### 1. User Registration
1. Visit `http://localhost:3000/signup`
2. Enter name, email, password
3. Account is created locally
4. Redirected to dashboard

### 2. User Login
1. Visit `http://localhost:3000/login`
2. Enter email and password
3. Token stored in localStorage
4. Redirected to dashboard

### 3. Using Scanners

#### URL Scanner
1. Go to Dashboard → URL Scanner
2. Paste a URL
3. Click "Scan"
4. View results with threat score

#### Message Scanner
1. Go to Dashboard → Message Scanner
2. Paste message text
3. Click "Scan Message"
4. View classification and indicators

#### Deepfake Scanner
1. Go to Dashboard → Deepfake Scanner
2. Upload image/video
3. Click "Scan for Deepfakes"
4. View authenticity score

#### News Scanner
1. Go to Dashboard → Fake News
2. Enter headline
3. Click "Check News"
4. View verification result

### 4. View Analytics
1. Go to Dashboard → Analytics
2. View weekly trends
3. See scanner performance
4. Check threat distribution

### 5. Manage History
1. Go to Dashboard → History
2. Search and filter scans
3. View detailed results
4. Export reports

### 6. Monitor Alerts
1. Go to Dashboard → Alerts
2. View alerts by severity
3. Mark as read
4. Delete alerts

---

## Demo Credentials

```
Email: demo@truthshield.ai
Password: demo123
```

---

## File Structure Overview

### Frontend Architecture
```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── dashboard/
│       ├── layout.tsx        # Dashboard layout with sidebar
│       ├── page.tsx          # Dashboard home
│       ├── url-scanner/
│       ├── message-scanner/
│       ├── deepfake-scanner/
│       ├── news-scanner/
│       ├── analytics/
│       ├── history/
│       └── alerts/
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
└── package.json
```

### Backend Architecture
```
backend/
├── server.js                 # Main API server
├── utils/
│   └── mockData.js          # Data generators
├── .env                     # Environment config
└── package.json
```

---

## Key Configuration Details

### Tailwind CSS Colors
```
Primary: #00d4ff (Cyan/Blue)
Secondary: #b24bff (Purple)
Dark: #0a0e27 (Very Dark Blue)
Dark Card: #151a3a (Dark Blue)
Dark Border: #2d3561 (Border Color)
```

### Fonts & Typography
- System UI sans-serif
- Inter-compatible
- Font sizes: sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

### Breakpoints
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

---

## Testing the Application

### Test Scenarios

#### 1. Test Login
```
- Try demo credentials
- Create new account
- Check localStorage for user data
```

#### 2. Test Scanners
```
URL Scanner:
- Paste: https://suspicious-login.com
- Expected: DANGEROUS threat level

Message Scanner:
- Paste: "Verify your account now! Click here..."
- Expected: SCAM classification

Deepfake Scanner:
- Upload: any image
- Expected: Random authenticity score

News Scanner:
- Enter: "Breaking: Celebrity shocking news"
- Expected: UNVERIFIED result
```

#### 3. Test Dashboard Features
```
- View real-time stats
- Check charts and graphs
- Browse scan history
- Filter by threat level
- Manage alerts
```

---

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installed:**
```bash
rm -rf node_modules
npm install
```

**Tailwind styles not applying:**
```bash
npm run dev
# Clear cache and reload browser
```

### Backend Issues

**Port 5000 already in use:**
```bash
# Similar to above, use port 5000
```

**Dependencies error:**
```bash
npm install
npm start
```

**CORS errors:**
Check `.env` file has correct `CORS_ORIGIN`

---

## Production Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Heroku)
```bash
heroku create truthshield-api
heroku config:set PORT=5000
git push heroku main
```

---

## Performance Optimization

- Next.js automatic code splitting
- Image optimization enabled
- CSS minification via Tailwind
- API response caching ready
- Lazy loading components

---

## Security Considerations

- Input validation on all forms
- Safe localStorage usage
- XSS protection via React
- CORS configured
- Mock JWT tokens
- No sensitive data in frontend

---

## Next Steps

1. **Database Integration**: Connect MongoDB or Firebase
2. **Real ML Models**: Integrate actual threat detection models
3. **Email Notifications**: Send alerts via email
4. **Payment Integration**: Add subscription system
5. **Advanced Auth**: Add OAuth, 2FA
6. **Browser Extension**: Create browser extension
7. **Mobile App**: React Native version

---

## Support & Documentation

- GitHub Issues: Report bugs
- Code Comments: Inline documentation
- API Docs: See README.md
- Tutorial: Follow user workflow above

---

**Happy Threat Hunting! 🛡️**
