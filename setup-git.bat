@echo off
echo Setting up Git repository for Vercel deployment...
echo.

echo Step 1: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Step 2: Adding all files to Git...
git add .

echo Step 3: Creating initial commit...
git commit -m "Initial commit: Simple habit tracker app"

echo.
echo ✅ Git repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub.com
echo 2. Copy the repository URL
echo 3. Run these commands (replace YOUR_USERNAME and REPO_NAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. Go to vercel.com and import your GitHub repository
echo.
pause
