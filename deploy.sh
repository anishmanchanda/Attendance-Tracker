#!/bin/bash

# College Attendance Smart - Deploy Script
echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "💡 You can install it using nvm:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   source ~/.zshrc"
    echo "   nvm install --lts"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your Supabase credentials if needed."
fi

# Build the project
echo "🏗️  Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "🌐 Ready for deployment to Vercel!"
    echo "   1. Install Vercel CLI: npm i -g vercel"
    echo "   2. Run: vercel"
    echo "   3. Follow the prompts"
    echo ""
    echo "🔧 Or push to GitHub and connect to Vercel for automatic deployments"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
