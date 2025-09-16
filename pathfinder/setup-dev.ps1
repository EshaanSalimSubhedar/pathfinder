# Pathfinder Development Setup Script
Write-Host "🚀 Setting up Pathfinder Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js and npm are installed" -ForegroundColor Green

# Install root dependencies
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
npm install

# Go back to root
Set-Location ..

# Create environment files
Write-Host "⚙️  Setting up environment files..." -ForegroundColor Yellow

# Backend environment file
if (!(Test-Path "backend/.env")) {
    Write-Host "📝 Creating backend/.env file..." -ForegroundColor Cyan
    Copy-Item "backend/env.example" "backend/.env"
    Write-Host "✅ Backend environment file created. Please update with your database credentials." -ForegroundColor Green
} else {
    Write-Host "✅ Backend environment file already exists." -ForegroundColor Green
}

# Frontend environment file
if (!(Test-Path "frontend/.env")) {
    Write-Host "📝 Creating frontend/.env file..." -ForegroundColor Cyan
    @"
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Pathfinder
"@ | Out-File -FilePath "frontend/.env" -Encoding utf8
    Write-Host "✅ Frontend environment file created." -ForegroundColor Green
} else {
    Write-Host "✅ Frontend environment file already exists." -ForegroundColor Green
}

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
Set-Location backend
npx prisma generate
Set-Location ..

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update backend/.env with your database credentials" -ForegroundColor White
Write-Host "2. Set up PostgreSQL database" -ForegroundColor White
Write-Host "3. Run 'npm run db:push' to create database schema" -ForegroundColor White
Write-Host "4. Run 'npm run dev' to start both frontend and backend" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   API Docs: http://localhost:5000/api/docs" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green


