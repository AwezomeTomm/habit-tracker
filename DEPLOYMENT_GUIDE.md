# Deploying to Vercel - Step by Step Guide

## Prerequisites
- Git installed on your computer
- A GitHub account
- A Vercel account (free)

## Step 1: Install Git (if not already installed)

1. Go to https://git-scm.com/download/win
2. Download and install Git for Windows
3. Restart your terminal/command prompt

## Step 2: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Simple habit tracker app"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name it something like "habit-tracker" or "simple-habit-tracker"
4. Make it **Public** (required for free Vercel deployment)
5. Don't initialize with README (since you already have files)
6. Click "Create repository"

## Step 4: Connect Local Repository to GitHub

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Deploy via Vercel Website (Recommended)

1. Go to https://vercel.com
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Next.js project
6. Click "Deploy" (no configuration needed!)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? (press enter for default)
# - Directory? (press enter for current directory)
```

## Step 6: Configure Domain (Optional)

After deployment, Vercel will give you a URL like:
- `https://your-project-name.vercel.app`

You can:
- Use this URL as-is
- Add a custom domain in Vercel dashboard
- Configure environment variables if needed

## Step 7: Automatic Deployments

Once connected, every time you push to your main branch on GitHub, Vercel will automatically redeploy your app!

## Troubleshooting

### Common Issues:

1. **Build Errors**: Check the Vercel build logs in the dashboard
2. **Environment Variables**: Add them in Vercel dashboard under Settings > Environment Variables
3. **Node Version**: Vercel auto-detects, but you can specify in `package.json`:
   ```json
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

### Local Testing Before Deploy:

```bash
# Build the project locally to test
npm run build

# Start production server locally
npm start
```

## Your App Features on Vercel:

✅ **Automatic HTTPS** - Your app will be secure by default
✅ **Global CDN** - Fast loading worldwide
✅ **Automatic Deployments** - Push to GitHub = instant deployment
✅ **Preview Deployments** - Every pull request gets its own URL
✅ **Analytics** - Built-in performance monitoring
✅ **Custom Domains** - Add your own domain name

## Next Steps After Deployment:

1. **Share your app**: Send the Vercel URL to friends/family
2. **Monitor usage**: Check Vercel analytics dashboard
3. **Add features**: Push updates to GitHub for automatic deployment
4. **Custom domain**: Add your own domain in Vercel settings

Your habit tracker will be live and accessible to anyone with the URL!
