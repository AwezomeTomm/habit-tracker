# Whop App Setup Guide

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Whop App Environment Variables
# Copy these values from your Whop Dashboard after creating your app

# Your Whop App API Key (required)
# Get this from: https://whop.com/dashboard/developer/
WHOP_API_KEY=your_whop_api_key_here

# Your Whop App ID (required)
# Get this from: https://whop.com/dashboard/developer/
NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id_here

# Your Whop Agent User ID (optional but recommended)
# This is the user ID that will make API requests on behalf of your app
# You can create an agent user in your Whop dashboard
NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id_here

# Your Whop Company ID (optional)
# This is the company ID for API requests that need company context
NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id_here
```

## Getting Your Environment Variables

1. Go to [Whop Dashboard](https://whop.com/dashboard/developer/)
2. Create a new app or select an existing one
3. Go to the "Hosting" section and set:
   - Base URL: Your domain (e.g., `https://your-app.vercel.app`)
   - App path: `/experiences/[experienceId]`
   - Discover path: `/discover`
4. Copy the environment variables from the dashboard
5. Paste them into your `.env.local` file

## Running the App

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. The app will be available at `http://localhost:3000`

## Authentication

The app uses the Whop SDK for authentication. The `WhopApp` component in `app/layout.tsx` handles the authentication flow automatically.

## Next Steps

- Customize the app pages in the `app/` directory
- Add your own components and features
- Deploy to Vercel or your preferred platform

