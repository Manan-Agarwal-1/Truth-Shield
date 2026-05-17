#!/usr/bin/env pwsh
# Truth-Shield AI - Full Setup and Start Script
# PowerShell Version

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Truth-Shield AI - Full Setup and Start" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "[INFO] Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install backend dependencies
Write-Host "[STEP 1] Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend
Write-Host "Directory: $(Get-Location)" -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install backend dependencies!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "[SUCCESS] Backend dependencies installed!" -ForegroundColor Green
Write-Host ""

# Install frontend dependencies
Write-Host "[STEP 2] Installing frontend dependencies..." -ForegroundColor Yellow
Push-Location frontend
Write-Host "Directory: $(Get-Location)" -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install frontend dependencies!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "[SUCCESS] Frontend dependencies installed!" -ForegroundColor Green
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Green
Write-Host ""
Write-Host "Terminal 1 - Backend:" -ForegroundColor Green
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend:" -ForegroundColor Green
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
