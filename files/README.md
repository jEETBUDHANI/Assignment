# Task Management Web Application

A complete MERN stack task management application with user authentication, real-time task management, and a responsive user interface.

## Features

✓ User Registration and Login
✓ Secure JWT Authentication
✓ Create, Read, Update, Delete Tasks
✓ Mark Tasks as Completed or Pending
✓ Search and Filter Tasks
✓ Responsive Design for Mobile and Desktop
✓ Protected Routes
✓ Form Validation
✓ Clean and Intuitive UI

## Project Structure

```
task-management-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authenticateToken.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── components/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskItem.js
│   │   │   └── TaskEditForm.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── AuthPages.css
│   │   │   ├── Dashboard.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   ├── TaskItem.css
│   │   │   └── TaskEditForm.css
│   │   ├── AuthContext.js
│   │   ├── ProtectedRoute.js
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Backend Setup

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management
   JWT_SECRET=your_secret_key_here_make_it_strong
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the React application:
   ```
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Task Routes (Protected)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks?status=pending` - Filter by status
- `GET /api/tasks?search=keyword` - Search tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task status

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Task Schema
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'completed']),
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## How to Use

1. **Register** - Create a new account by visiting the Register page
2. **Login** - Sign in with your email and password
3. **Dashboard** - View your tasks and create new ones
4. **Add Task** - Fill the form and click "Add Task"
5. **Edit Task** - Click the "Edit" button on any task
6. **Delete Task** - Click the "Delete" button to remove a task
7. **Toggle Status** - Check the checkbox to mark task as completed
8. **Search** - Use the search box to find specific tasks
9. **Filter** - Click filter buttons to view specific task statuses

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin resource sharing

### Frontend
- React - UI library
- React Router - Navigation
- Axios - HTTP client
- CSS3 - Styling
- React Hooks - State management

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Secure token storage in localStorage
- Input validation on both frontend and backend

## Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## Error Handling

- User-friendly error messages
- Form validation
- API error handling
- Network error management
- Loading states

## Future Enhancements

- Task categories/tags
- Task priority levels
- Due dates and reminders
- Task attachments
- Collaborative tasks
- Dark mode
- Email notifications
- Password reset functionality
- OAuth integration

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the GitHub repository.
