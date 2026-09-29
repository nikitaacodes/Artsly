# Artsly - Artistic Collaboration Platform

Artsly is a modern web application for artists to share their work, collaborate, and build a community. Built with React, Node.js, MongoDB, and Firebase.

## Features

✅ **User Authentication**: Secure signup/login with JWT
✅ **Posts Management**: Create, edit, delete posts with images
✅ **Image Uploads**: Firebase Storage integration for seamless media uploads
✅ **Comments System**: Add, edit, delete comments on posts
✅ **Like & Share**: Like posts and track shares
✅ **User Profiles**: View user profiles, follow/unfollow artists
✅ **Feed**: Personalized feed with pagination
✅ **Trending**: View trending posts by likes
✅ **Rate Limiting**: Request rate limiting for security
✅ **Role-Based Access**: Admin, moderator, and user roles
✅ **Responsive Design**: Tailwind CSS for mobile-first design

## Project Structure

```
Artsly/
├── Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── redux/slices/
│   │   ├── utils/api.js
│   │   └── config/firebase.js
│   └── package.json

Artsly-backend/
├── Backend (Node.js + Express)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── app.js
│   └── package.json
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Firebase project
- npm or yarn

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd "Artsly backend"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file** (copy from .env.example)

   ```bash
   cp .env.example .env
   ```

4. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Add the following to `.env`:
     ```
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_PRIVATE_KEY_ID=your_key_id
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@xxx.iam.gserviceaccount.com
     FIREBASE_CLIENT_ID=your_client_id
     FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     ```

5. **Update MongoDB connection**

   ```
   DB_CONNECTION_URL=mongodb+srv://username:password@cluster.mongodb.net/artsly
   ```

6. **Set JWT secret**

   ```
   JWT_SECRET=your_strong_secret_key_here
   ```

7. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd Artsly
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file** (copy from .env.example)

   ```bash
   cp .env.example .env
   ```

4. **Configure Firebase credentials**
   - Go to your Firebase project settings
   - Copy Web API credentials to `.env`:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

5. **Set API URL**

   ```
   VITE_API_URL=http://localhost:5000
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /signup` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user

### Posts

- `POST /post` - Create post (with images)
- `GET /post/:id` - Get single post
- `PATCH /post/:id` - Update post
- `DELETE /deletepost/:id` - Delete post
- `POST /post/:id/like` - Like/unlike post
- `POST /post/:id/share` - Share post

### Feed

- `GET /feed?page=1&limit=10` - Get feed with pagination
- `GET /feed/trending` - Get trending posts

### Comments

- `POST /comments` - Create comment
- `GET /comments/post/:postId` - Get post comments
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Users

- `GET /user` - Get current user profile
- `GET /user/:userId` - Get user profile
- `PATCH /user/:userId` - Update user profile
- `POST /user/:userId/follow` - Follow/unfollow user
- `DELETE /user/:id` - Delete user account

## Deployment

### Backend Deployment (Heroku)

1. **Install Heroku CLI**

   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**

   ```bash
   heroku login
   ```

3. **Create Heroku app**

   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**

   ```bash
   heroku config:set DB_CONNECTION_URL=your_mongodb_url
   heroku config:set JWT_SECRET=your_secret
   heroku config:set FIREBASE_PROJECT_ID=your_project_id
   # ... set other Firebase variables
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - Add all `VITE_*` variables

4. **Update backend API URL in production**
   ```
   VITE_API_URL=https://your-backend-url.herokuapp.com
   ```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password encryption
- **Rate Limiting**: Protects against brute force and DDoS
- **Role-Based Access Control**: Granular permission management
- **CORS**: Configured for specific origins
- **HTTP-Only Cookies**: Secure cookie handling
- **Input Validation**: Express validator for all inputs

## Technology Stack

### Frontend

- React 19
- Redux Toolkit
- Tailwind CSS
- Firebase Storage
- Axios
- Vite
- React Router

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- Firebase Admin SDK
- JWT
- Bcrypt
- Express Rate Limit

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Direct messaging
- [ ] Notifications system
- [ ] Story features
- [ ] Collaboration requests
- [ ] Payment integration for artists
- [ ] Portfolio generation
- [ ] Search and discovery
- [ ] Mobile app (React Native)

---

**Happy Creating! 🎨**
