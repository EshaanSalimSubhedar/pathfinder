#!/bin/bash

# Pathfinder Development Setup Script
echo "🚀 Setting up Pathfinder Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Go back to root
cd ..

# Create environment files
echo "⚙️  Setting up environment files..."

# Backend environment file
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env file..."
    cp backend/env.example backend/.env
    echo "✅ Backend environment file created. Please update with your database credentials."
else
    echo "✅ Backend environment file already exists."
fi

# Frontend environment file
if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env file..."
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Pathfinder
EOF
    echo "✅ Frontend environment file created."
else
    echo "✅ Frontend environment file already exists."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Set up PostgreSQL database"
echo "3. Run 'npm run db:push' to create database schema"
echo "4. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   API Docs: http://localhost:5000/api/docs"
echo ""
echo "Happy coding! 🎉"


