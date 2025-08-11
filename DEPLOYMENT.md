# Deployment Guide

## 🚀 Quick Deployment to Vercel

### Method 1: One-Command Setup and Deploy

```bash
# Run the setup script (installs Node.js, npm, dependencies)
./setup.sh

# Run the app locally to test
npm run dev

# Deploy to Vercel
npm run deploy:vercel
```

### Method 2: Manual Step-by-Step

1. **Install Node.js and npm**
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.zshrc
   nvm install --lts
   nvm use --lts
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local if you have your own Supabase instance
   ```

4. **Test locally**
   ```bash
   npm run dev
   # Open http://localhost:8080
   ```

5. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   # Follow the prompts
   ```

### Method 3: GitHub + Vercel Integration (Recommended for Production)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a Vite project

3. **Configure Environment Variables (if needed)**
   In Vercel dashboard, add:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Deploy**
   - Vercel will automatically build and deploy
   - Future pushes to main branch will auto-deploy

## 🌐 Custom Domain Setup

After deploying to Vercel:

1. Go to your project dashboard on Vercel
2. Click on "Domains" tab
3. Add your custom domain
4. Update your DNS settings as instructed

## 🔧 Environment Variables

For production deployment, you may want to use your own Supabase instance:

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Update the environment variables in Vercel or your hosting platform

## 📊 Analytics and Monitoring

Vercel provides built-in analytics. You can also add:
- Google Analytics
- Sentry for error tracking
- LogRocket for user session recording

## 🔒 Security Considerations

- The current Supabase keys are for demo purposes
- For production, create your own Supabase project
- Enable Row Level Security (RLS) in Supabase
- Consider implementing rate limiting for API calls

## 🚀 Performance Optimizations

The project already includes:
- ✅ Vite for fast builds
- ✅ Tree-shaking for smaller bundles
- ✅ Code splitting with React.lazy (can be added)
- ✅ Optimized production builds

## 🐛 Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Environment Variable Issues
- Make sure environment variables start with `VITE_`
- Check .env.local exists and has correct values
- Restart dev server after changing environment variables

### Deployment Issues
- Check Vercel logs in the dashboard
- Ensure build command is set to `npm run build`
- Verify environment variables are set in Vercel dashboard
