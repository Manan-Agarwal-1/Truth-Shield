#!/bin/bash
# TruthShield AI - Quick Start Script

echo "🛡️  TruthShield AI - Quick Start Setup"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo "✅ npm detected: $(npm --version)"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd ../backend
npm install
echo "✅ Backend dependencies installed"
echo ""

echo "🚀 Setup Complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo "  → http://localhost:3000"
echo ""
echo "Terminal 2 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo "  → http://localhost:5000"
echo ""
echo "Demo Credentials:"
echo "  Email: demo@truthshield.ai"
echo "  Password: demo123"
echo ""
echo "Happy Threat Hunting! 🎯"
