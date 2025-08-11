# College Attendance Smart System

A modern college attendance management system built with React, TypeScript, and Supabase.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended to use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd college-attend-smart-main
   ```

2. **Install Node.js (if not already installed)**
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.zshrc
   nvm install --lts
   nvm use --lts
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials if needed.

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🌐 Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to deploy your project.

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

3. **Deploy**
   Vercel will automatically build and deploy your project.

### Environment Variables for Production

In your Vercel dashboard, add these environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Database + Auth)
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI primitives

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── BackgroundGlow.tsx
│   ├── PageHeader.tsx
│   └── ProtectedRoute.tsx
├── context/            # React contexts
├── data/               # Static data and mock data
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── pages/              # Page components
└── services/           # API services
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📝 Features

- 🔐 Authentication with Supabase
- 📊 Dashboard with attendance analytics
- 📅 Schedule management
- 👥 Student management
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components

## 🔒 Security Notes

- Environment variables are used for sensitive configurations
- Supabase RLS (Row Level Security) should be configured for data protection
- The current setup includes public keys which are safe for client-side use

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
