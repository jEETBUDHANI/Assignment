# Task Management Application - File Guide

This document explains what each file in the project does in simple, easy-to-understand language.

## BACKEND FILES

### server.js
This is the main entry point of the backend. Think of it as the manager of the entire backend.

What it does:
- Starts the server on port 5000
- Connects to MongoDB database
- Sets up all the routes (user and task)
- Enables CORS so the frontend can communicate with backend
- Listens for incoming requests

### /models/User.js
This file defines the structure of a user in the database.

What it does:
- Defines what information a user must have (name, email, password)
- Automatically hashes passwords before saving (security feature)
- Provides a method to check if a password is correct

### /models/Task.js
This file defines the structure of a task in the database.

What it does:
- Defines what information a task has (title, description, status, userId)
- Automatically updates the modification time when a task is changed
- Connects tasks to specific users

### /middleware/authenticateToken.js
This is a security guard for protected routes.

What it does:
- Checks if the user has a valid token before allowing access
- Extracts user ID from the token
- Blocks access if there's no token or if the token is invalid

### /controllers/userController.js
This file contains all user-related logic like registration and login.

What it does:
- registerUser: Creates a new user account (validates email, password, creates account)
- loginUser: Checks email and password, creates token if correct

### /controllers/taskController.js
This file contains all task-related logic.

What it does:
- createTask: Creates a new task for the logged-in user
- getTasks: Gets all tasks of the user (with filtering and searching)
- getTaskById: Gets one specific task
- updateTask: Changes the title or description of a task
- deleteTask: Removes a task
- toggleTaskStatus: Changes task from pending to completed or vice versa

### /routes/userRoutes.js
This file defines the user API endpoints.

What it does:
- Connects /api/users/register to the registerUser function
- Connects /api/users/login to the loginUser function

### /routes/taskRoutes.js
This file defines the task API endpoints.

What it does:
- Connects /api/tasks to the task controller functions
- Protects all task routes with authentication middleware
- Maps GET, POST, PUT, DELETE, PATCH requests to their functions

### package.json
Configuration file for Node.js project.

What it does:
- Lists all required libraries (dependencies)
- Defines start and dev commands
- Stores project information

### .env.example
Example environment variables file.

What it does:
- Shows what environment variables need to be set up
- Acts as a template for the actual .env file

---

## FRONTEND FILES

### src/api.js
This file handles all communication with the backend.

What it does:
- Creates an axios instance for HTTP requests
- Adds authentication token to every request
- Provides functions to call all backend APIs (register, login, create task, etc.)
- Handles API URL configuration

### src/AuthContext.js
This file manages the user authentication state globally.

What it does:
- Stores user information and token in memory
- Provides login and logout functions
- Keeps user logged in even after page refresh
- Makes authentication state available to all components

### src/ProtectedRoute.js
This file protects routes that need authentication.

What it does:
- Checks if user is logged in before showing a page
- Redirects to login if user is not authenticated
- Shows loading state while checking authentication

### src/App.js
This is the main application file that sets up routing.

What it does:
- Defines all routes (Login, Register, Dashboard)
- Wraps the app with AuthProvider
- Uses ProtectedRoute to secure the dashboard

### src/index.js
Entry point for the React application.

What it does:
- Renders the React app into the HTML
- Starts the entire application

### src/pages/Login.js
The login page component.

What it does:
- Shows a form for email and password
- Validates user input
- Sends login request to backend
- Saves token and redirects to dashboard

### src/pages/Register.js
The registration page component.

What it does:
- Shows a form for name, email, password
- Validates form (email format, password match)
- Creates new user account
- Automatically logs in after registration

### src/pages/Dashboard.js
The main dashboard where users see and manage tasks.

What it does:
- Shows welcome message and logout button
- Displays task statistics (total, completed, pending)
- Shows the task form to create new tasks
- Shows list of tasks
- Handles filtering (all, pending, completed)
- Handles searching tasks
- Provides logout functionality

### src/components/TaskForm.js
Component for creating new tasks.

What it does:
- Shows form with title and description fields
- Validates that title is not empty
- Sends new task to backend
- Resets form after successful creation

### src/components/TaskList.js
Component that displays all tasks.

What it does:
- Maps through tasks array and displays each one
- Handles editing mode switching
- Passes tasks to TaskItem component
- Manages edit functionality

### src/components/TaskItem.js
Component that displays a single task.

What it does:
- Shows task title, description, and status
- Provides checkbox to mark task as done
- Shows Edit and Delete buttons
- Handles toggle and delete operations

### src/components/TaskEditForm.js
Component for editing an existing task.

What it does:
- Shows form pre-filled with current task data
- Allows editing title and description
- Sends updated data to backend
- Provides save and cancel buttons

### src/styles/index.css
Main global styles.

What it does:
- Sets up basic styling for buttons, forms, messages
- Defines color scheme and variables
- Applies to entire application

### src/styles/AuthPages.css
Styles for Login and Register pages.

What it does:
- Styles the login/register form container
- Creates beautiful gradient background
- Makes form centered and responsive

### src/styles/Dashboard.css
Styles for the dashboard page.

What it does:
- Styles header with user info
- Styles task statistics cards
- Styles search and filter section
- Makes everything responsive on mobile

### src/styles/TaskForm.css
Styles for the task creation form.

What it does:
- Styles the form container
- Makes form inputs look nice
- Styles the submit button

### src/styles/TaskList.css
Styles for the task list container.

What it does:
- Arranges tasks in a vertical list
- Adds spacing between tasks

### src/styles/TaskItem.css
Styles for individual task cards.

What it does:
- Styles the task card
- Makes checkbox and buttons look nice
- Adds hover effects
- Makes tasks responsive

### src/styles/TaskEditForm.css
Styles for the task editing form.

What it does:
- Styles the edit form container
- Arranges form buttons
- Makes edit form look different from view mode

### public/index.html
The main HTML file.

What it does:
- Provides the HTML structure
- Has a div with id "root" where React mounts
- Sets up meta tags for responsiveness

### package.json (Frontend)
Configuration file for React project.

What it does:
- Lists React and other frontend libraries
- Defines start command to run development server
- Defines build command to create production build

### .env.example (Frontend)
Example environment file for frontend.

What it does:
- Shows what environment variables are needed
- Points to the backend API URL

---

## HOW EVERYTHING WORKS TOGETHER

1. **User starts the app** → Loads React frontend from localhost:3000

2. **User registers/logs in** → 
   - Frontend sends data to backend
   - Backend validates and creates/checks user
   - Backend sends back JWT token
   - Frontend stores token and redirects to dashboard

3. **User sees dashboard** →
   - Dashboard loads user's tasks from backend
   - Backend checks token and returns only this user's tasks
   - Tasks are displayed on the page

4. **User creates a task** →
   - Frontend sends task data with token to backend
   - Backend saves task to MongoDB
   - Frontend gets the new task and updates display

5. **User edits/deletes task** →
   - Frontend sends request to backend with token
   - Backend updates/deletes task in MongoDB
   - Frontend updates the display

6. **User logs out** →
   - Frontend removes token from storage
   - User redirected to login page

---

## KEY CONCEPTS

**JWT Token**: A secure token that identifies the user. Like a digital ID card that proves who you are.

**Authentication**: Proving who you are (login/register)

**Protected Route**: A page that only logged-in users can see

**API**: A way for frontend and backend to communicate

**Database**: Where all data is stored permanently

**Middleware**: A security guard that checks requests before they reach the main handler
