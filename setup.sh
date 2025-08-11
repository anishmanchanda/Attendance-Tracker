#!/bin/bash

# College Attendance Smart - Development Setup Script
echo "🛠️  Setting up development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "💡 Installing Node.js using nvm..."
    
    # Install nvm if not installed
    if ! command -v nvm &> /dev/null; then
        echo "📥 Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        source ~/.zshrc
    fi
    
    echo "📥 Installing Node.js LTS..."
    nvm install --lts
    nvm use --lts
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Setup environment variables
if [ ! -f ".env.local" ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "📖 The app will be available at http://localhost:8080"
echo ""
echo "🔧 Other useful commands:"
echo "   npm run build    - Build for production"
echo "   npm run preview  - Preview production build"
echo "   npm run lint     - Run linter"
