#!/bin/bash

# College Attendance Smart - Quick Start Script
echo "🚀 Starting College Attendance Smart..."

# Load nvm if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please run ./setup.sh first"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Start the development server
echo "🔄 Starting development server..."
npm run dev
