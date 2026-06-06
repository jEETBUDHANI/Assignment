# Quick Start Guide

Follow these steps to run the Task Management Application:

## Step 1: MongoDB Setup

1. Go to MongoDB website: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Keep it safe - you'll need it in Step 4

## Step 2: Backend Setup

1. Open terminal/command prompt
2. Navigate to backend folder:
   ```
   cd backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create .env file (copy from .env.example):
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_secret_key_you_choose
   PORT=5000
   ```

5. Start the server:
   ```
   npm start
   ```

You should see: "Server running on port 5000"

## Step 3: Frontend Setup

1. Open a new terminal/command prompt
2. Navigate to frontend folder:
   ```
   cd frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create .env file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start the application:
   ```
   npm start
   ```

The app will automatically open in your browser at localhost:3000

## Step 4: Test the Application

1. Click "Register" and create a new account
2. Fill in name, email, and password
3. Click "Register" button
4. You should be redirected to the dashboard
5. Try creating a task
6. Try editing and deleting tasks
7. Try filtering and searching
8. Try the logout button

## Troubleshooting

If you get an error:
- Make sure MongoDB connection string is correct
- Make sure both backend and frontend are running
- Check that ports 5000 and 3000 are not in use
- Clear browser cache and try again
- Check the browser console for error messages

## Important Notes

- Keep the terminal windows open while using the app
- Backend must be running before you use the frontend
- Don't close the terminal windows unless you want to stop the app
- Each time you restart, the backend will connect to MongoDB
