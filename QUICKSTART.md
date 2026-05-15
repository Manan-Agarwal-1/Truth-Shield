# 🚀 TruthShield AI - Quick Commands Reference

## Installation

```bash
# Clone repository
git clone https://github.com/Manan-Agarwal-1/Truth-Shield.git
cd Truth-Shield

# Setup both frontend and backend
./setup.sh
```

## Development - Terminal 1 (Frontend)

```bash
cd frontend
npm install
npm run dev
# Opens http://localhost:3000
```

## Development - Terminal 2 (Backend)

```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

## Docker Deployment

```bash
# Start both frontend and backend
docker-compose up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

## Production Build

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Backend
```bash
cd backend
npm start
```

## Available Scripts

### Frontend Scripts
```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev      # Development server
npm start        # Production server
```

## Demo Credentials

```
Email: demo@truthshield.ai
Password: demo123
```

## API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/login
POST   /api/auth/signup
POST   /api/auth/logout
GET    /api/auth/me
```

### Scanners
```
POST   /api/scan/url
POST   /api/scan/message
POST   /api/scan/deepfake
POST   /api/scan/news
```

### Data
```
GET    /api/scans/history
GET    /api/scans/:id
GET    /api/analytics
GET    /api/analytics/dashboard
GET    /api/alerts
POST   /api/alerts/:id/read
DELETE /api/alerts/:id
GET    /api/stats
GET    /api/users
```

## Project Structure

```
Truth-Shield/
├── frontend/          # Next.js + React + Tailwind
│   ├── app/          # App directory
│   ├── components/   # Reusable components
│   └── public/       # Static assets
├── backend/          # Node.js + Express
│   ├── server.js     # Main server
│   └── utils/        # Utilities & mock data
├── README.md         # Main documentation
├── SETUP.md          # Detailed setup guide
├── FEATURES.md       # Feature overview
└── docker-compose.yml # Docker configuration
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Troubleshooting

### Port Conflicts
```bash
# Find process on port
lsof -i :3000    # Frontend
lsof -i :5000    # Backend

# Kill process
kill -9 <PID>
```

### Clear Cache
```bash
# Frontend
rm -rf frontend/.next
rm -rf frontend/node_modules

# Backend
rm -rf backend/node_modules

# Reinstall
npm install
```

### Dependencies Issue
```bash
npm install
# or
yarn install
```

## Deployment Checklist

- [ ] Update API URLs for production
- [ ] Configure database connection
- [ ] Set up environment variables
- [ ] Run production build
- [ ] Test all endpoints
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Verify CORS settings
- [ ] Test in production

## Testing Sample Data

### Test URL Scanner
```
URL: https://suspicious-login.com
Expected: DANGEROUS (High threat)

URL: https://github.com
Expected: SAFE
```

### Test Message Scanner
```
Message: "Verify your account now! Click here..."
Expected: SCAM

Message: "Hey, how are you?"
Expected: SAFE
```

### Test News Scanner
```
Headline: "Shocking: Celebrity announces news!"
Expected: UNVERIFIED

Headline: "Weather forecast for tomorrow"
Expected: VERIFIED
```

## Performance Tips

1. Use production builds for deployment
2. Enable browser caching
3. Minimize API calls
4. Use pagination for large datasets
5. Optimize images
6. Monitor database queries
7. Use CDN for static assets
8. Enable gzip compression

## Security Tips

1. Change demo credentials in production
2. Use environment variables for secrets
3. Implement rate limiting
4. Add request validation
5. Use HTTPS only
6. Implement proper authentication
7. Sanitize user inputs
8. Monitor for suspicious activity

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [Recharts](https://recharts.org/)
- [Node.js](https://nodejs.org/)

## Support

- Check SETUP.md for detailed setup instructions
- Check FEATURES.md for complete feature list
- Review README.md for comprehensive documentation
- Check API responses in backend logs
- Verify environment variables are set

---

**Happy Threat Hunting! 🛡️**
