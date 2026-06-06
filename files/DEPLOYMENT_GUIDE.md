# Deployment Guide - Task Management Application

This guide shows how to deploy the Task Management Application to the internet so anyone can access it.

## Before Deployment

Make sure you have:
1. Completed the entire application
2. Tested all features locally
3. Fixed all bugs
4. Created GitHub repository
5. GitHub account
6. MongoDB Atlas account (cloud database)
7. Vercel or Netlify account (for frontend)
8. Heroku or similar account (for backend)

---

## STEP 1: Prepare Backend for Deployment

### 1.1 Update Environment Variables

Go to `backend/.env.example`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management
JWT_SECRET=your_secret_key_here_make_it_strong
PORT=5000
```

### 1.2 Update package.json

Make sure `backend/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 1.3 Update server.js

Make sure CORS is properly configured:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
  credentials: true
}));
```

### 1.4 Create Procfile (for Heroku)

Create file: `backend/Procfile`
```
web: node server.js
```

---

## STEP 2: Deploy Backend

### Option A: Deploy to Heroku (Free tier ending soon)

1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret_key
   ```
5. Deploy: `git push heroku main`
6. Check: `heroku logs --tail`

Backend URL will be: `https://your-app-name.herokuapp.com`

### Option B: Deploy to Render.com (Good free option)

1. Go to render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Option C: Deploy to Railway.app

1. Go to railway.app
2. Create new project
3. Connect GitHub
4. Add environment variables
5. Deploy

---

## STEP 3: Setup MongoDB Atlas (Production Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account or login
3. Create new cluster (select free tier)
4. Create database user
   - Username: admin
   - Password: Strong password (save it!)
5. Allow all IPs (for testing)
6. Get connection string:
   - Copy: `mongodb+srv://admin:password@cluster.mongodb.net/task_management`
   - Use this as MONGODB_URI
7. Create database: `task_management`

---

## STEP 4: Prepare Frontend for Deployment

### 4.1 Update .env file

Create `frontend/.env`:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

Replace `your-backend-url.com` with actual backend URL from Step 2

### 4.2 Build for Production

```
cd frontend
npm run build
```

This creates optimized production build in `build/` folder

### 4.3 Create package.json scripts

Make sure `frontend/package.json` has:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "serve": "serve -s build -l 3000"
  }
}
```

---

## STEP 5: Deploy Frontend

### Option A: Deploy to Vercel (Easiest)

1. Go to vercel.com
2. Click "Import Project"
3. Select GitHub repository
4. Set Framework: React
5. Set Build Command: `npm run build`
6. Set Output Directory: `build`
7. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url/api`
8. Deploy
9. Your app URL: `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. Go to netlify.com
2. Click "New site from Git"
3. Select GitHub repository
4. Set Build command: `npm run build`
5. Set Publish directory: `frontend/build`
6. Add environment variables
7. Deploy
8. Your app URL: `https://your-project.netlify.app`

### Option C: Deploy to GitHub Pages

1. Update `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```
2. Install gh-pages:
   ```
   npm install --save-dev gh-pages
   ```
3. Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Deploy:
   ```
   npm run deploy
   ```

---

## STEP 6: Update CORS on Backend

After getting frontend URL, update `backend/server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

Redeploy backend after this change

---

## STEP 7: Test Production App

1. Go to your frontend URL
2. Test registration
3. Test login
4. Test creating task
5. Test editing task
6. Test deleting task
7. Test searching
8. Test filtering
9. Test logout

If any errors:
- Check backend logs
- Check browser console (F12 → Console)
- Check Network tab for failed requests

---

## STEP 8: GitHub Repository Setup

1. Go to GitHub
2. Create repository
3. Clone to your computer:
   ```
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```
4. Add files and commit:
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
5. Create README.md with:
   - Project description
   - Features
   - Technology stack
   - Deployment links
   - Instructions for running locally

---

## STEP 9: Production Checklist

Before considering deployment complete, check:

### Backend Checklist:
- [ ] Server runs without errors
- [ ] Can connect to MongoDB
- [ ] Register endpoint works
- [ ] Login endpoint works
- [ ] Task CRUD endpoints work
- [ ] Protected routes work
- [ ] Environment variables set correctly
- [ ] Logs show successful deploys
- [ ] CORS configured correctly

### Frontend Checklist:
- [ ] App loads without errors
- [ ] Can access login page
- [ ] Can register new account
- [ ] Can login
- [ ] Can create tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Can search tasks
- [ ] Can filter tasks
- [ ] Can toggle status
- [ ] Can logout
- [ ] Looks good on mobile
- [ ] Looks good on desktop
- [ ] No console errors

### General Checklist:
- [ ] GitHub repository public
- [ ] README is complete
- [ ] Code is well-commented
- [ ] No sensitive data in code
- [ ] Environment variables used properly
- [ ] Database backup configured
- [ ] SSL/HTTPS working
- [ ] All links working

---

## STEP 10: Maintenance

### Regular Tasks:
- Check logs weekly for errors
- Monitor database usage
- Update dependencies monthly
- Review security practices
- Back up database regularly

### If Something Breaks:
1. Check logs first
2. Check environment variables
3. Verify MongoDB connection
4. Clear browser cache
5. Redeploy if needed
6. Check GitHub issues

---

## Cost Summary (2024)

### Free Options:
- MongoDB Atlas: Free tier (512MB)
- Vercel: Free tier for frontendend
- Render.com: Free tier for backend
- GitHub: Free for public repos

### Paid Options (Per Month):
- MongoDB Atlas: $57 minimum for production
- Vercel Pro: $20
- Render.com Pro: $12-499 depending on usage
- Email: $10-50 depending on volume

---

## After Deployment

### Share Your Project:
1. Add to portfolio
2. Share on LinkedIn
3. Share on Twitter/X
4. GitHub Stars from friends
5. Blog about the process

### Improve the App:
1. Add more features
2. Improve UI/UX
3. Add comments/notes
4. Add categories/tags
5. Add due dates
6. Add email notifications

---

## Helpful Links

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Heroku Docs: https://devcenter.heroku.com
- React Deployment: https://create-react-app.dev/deployment

---

## Summary

Deployment Process:
1. Set up MongoDB Atlas
2. Deploy backend to Heroku/Render/Railway
3. Deploy frontend to Vercel/Netlify
4. Update environment variables
5. Test everything
6. Share your project!

Congratulations on deploying your app to the internet!
