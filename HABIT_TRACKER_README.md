# Simple Habit Tracker

A clean, modern habit tracking application built with Next.js, TypeScript, and Tailwind CSS. Track your daily habits, monitor your progress, and build consistency with beautiful visualizations.

## Features

### ✅ Core Functionality
- **Create Habits**: Add new habits with custom names, descriptions, and frequencies
- **Track Progress**: Mark habits as complete/incomplete for each day
- **Edit Habits**: Update habit details, frequency, and visibility
- **Delete Habits**: Remove habits you no longer want to track
- **Archive Habits**: Temporarily hide habits without losing data

### 📊 Statistics & Analytics
- **Daily Overview**: See how many habits you've completed today
- **Streak Tracking**: Monitor current and longest streaks for each habit
- **Completion Rates**: Track your consistency with percentage-based metrics
- **Weekly Progress**: Visualize your progress throughout the week
- **Motivational Messages**: Get encouraging feedback based on your performance

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Local Storage**: All data persists in your browser (no account required)
- **Real-time Updates**: See changes immediately as you interact with habits
- **Beautiful UI**: Clean, modern interface with smooth animations

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## How to Use

### Creating Your First Habit
1. Click the **"Create Habit"** button on the dashboard
2. Enter a habit name (e.g., "Drink 8 glasses of water")
3. Add an optional description
4. Choose the frequency (Daily, Weekly, or Custom)
5. Select visibility (Private or Community)
6. Click **"Create Habit"**

### Tracking Daily Progress
1. On the dashboard, you'll see all your habits
2. Click the circle next to any habit to mark it as complete
3. Click again to mark it as incomplete
4. Your progress is automatically saved

### Viewing Statistics
1. Click **"Stats"** in the navigation menu
2. View your overall progress and completion rates
3. See weekly progress charts
4. Check individual habit performance

### Managing Habits
- **Edit**: Click the three dots menu on any habit card, then "Edit"
- **Archive**: Use the three dots menu to archive habits
- **Delete**: Use the three dots menu to permanently delete habits

## Data Storage

All your habit data is stored locally in your browser's localStorage. This means:
- ✅ No account required
- ✅ Your data stays private
- ✅ Works offline
- ⚠️ Data is tied to your specific browser/device
- ⚠️ Clearing browser data will remove your habits

## Technical Details

### Built With
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation utilities

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── create/            # Habit creation page
│   ├── edit/[id]/         # Habit editing page
│   ├── stats/             # Statistics page
│   └── page.tsx           # Main dashboard
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── HabitCard.tsx     # Habit display component
├── lib/                  # Utility functions
│   ├── habit-storage.ts  # Local storage management
│   ├── habit-utils.ts    # Habit calculations
│   └── types.ts          # TypeScript definitions
└── public/               # Static assets
```

### Key Features Implementation
- **Local Storage Management**: Custom hooks for persistent data
- **Streak Calculation**: Smart algorithms for tracking consecutive completions
- **Progress Visualization**: Real-time charts and progress bars
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Customization

### Adding New Habit Types
Edit `lib/types.ts` to add new habit categories or properties.

### Modifying Statistics
Update `lib/habit-utils.ts` to change how streaks and completion rates are calculated.

### Styling Changes
Modify `tailwind.config.ts` or individual component styles to match your preferences.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This is a simple habit tracker designed for personal use. Feel free to fork and modify for your own needs!

## License

MIT License - feel free to use this project for personal or commercial purposes.
