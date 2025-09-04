# 🎬 PickFlick

A collaborative movie selection app where roommates create lists of 5 movies each, then randomly pick one to watch together.

## 🚀 Features

- **Session-based collaboration**: Create sessions with unique 6-character codes
- **Movie search**: Search movies using The Movie Database (TMDB) API
- **Collaborative lists**: Add movies to shared sessions
- **Random selection**: Fair random movie selection algorithm
- **Real-time updates**: View session status and movies in real-time

## 🛠️ Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **TMDB API** for movie data
- **Express Validator** for input validation
- **CORS** enabled for frontend integration

## 📁 Project Structure

```
PickFlick/
├── backend/                    # Express.js API Server
│   ├── controllers/           # Business logic handlers
│   │   ├── sessionController.js    # Session CRUD operations
│   │   └── movieController.js      # Movie search & data handling
│   ├── models/                # Database schemas
│   │   └── Session.js             # MongoDB session model
│   ├── routes/                # API endpoint definitions
│   │   ├── sessions.js            # Session-related routes
│   │   └── movies.js              # Movie search routes
│   ├── middleware/            # Custom middleware
│   │   └── validation.js          # Request validation
│   ├── utils/                 # Helper functions
│   │   ├── generateCode.js        # Session code generator
│   │   ├── movieAPI.js            # TMDB integration
│   │   └── shuffle.js             # Random selection logic
│   ├── config/                # Configuration files
│   │   └── database.js            # MongoDB connection
│   ├── server.js              # Main application entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- TMDB API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PickFlick
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/pickflick

   # TMDB API Configuration
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Session Configuration
   SESSION_CODE_LENGTH=6
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Start the backend server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Health Check

- `GET /api/health` - Check if API is running

### Sessions

- `POST /api/sessions` - Create a new session
- `GET /api/sessions/:sessionCode` - Get session details
- `POST /api/sessions/:sessionCode/movies` - Add movie to session
- `POST /api/sessions/:sessionCode/select` - Select random movie
- `DELETE /api/sessions/:sessionCode` - Delete session

### Movies

- `POST /api/movies/search` - Search movies
- `GET /api/movies/:movieId` - Get movie details
- `GET /api/movies/popular` - Get popular movies

## 🎯 How It Works

1. **Create Session**: One roommate creates a session and gets a unique 6-character code
2. **Share Code**: Share the session code with other roommates
3. **Add Movies**: Each roommate searches and adds up to 5 movies to the session
4. **Select Movie**: When ready, trigger the random selection to pick a movie
5. **Watch Together**: Enjoy the randomly selected movie!

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev  # Start with nodemon for auto-restart
```

### Testing the API

Use tools like Postman or curl to test the endpoints. The API includes comprehensive validation and error handling.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Happy movie watching! 🍿**
