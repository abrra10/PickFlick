# 🎬 PickFlick Frontend

A modern React frontend for the PickFlick collaborative movie selection app.

## 🚀 Features

- **Session Management**: Create and join movie selection sessions
- **Movie Search**: Search movies using TMDB API integration
- **Real-time Collaboration**: Live updates when others add movies
- **Random Selection**: Fair movie selection with animated results
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Tech Stack**: React 18, Vite, Tailwind CSS

## 🛠️ Tech Stack

- **React 18** with hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Shared components
│   │   ├── session/        # Session-specific components
│   │   ├── movies/         # Movie-related components
│   │   └── shuffle/        # Selection components
│   ├── pages/              # Main page components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API integration
│   ├── context/            # React context providers
│   ├── utils/              # Helper functions
│   └── styles/             # CSS files
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend server running on `http://localhost:5000`

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

### Common Components

- `Header` - Navigation header with session info
- `Loading` - Loading spinner with customizable size
- `ErrorMessage` - Error display with dismiss functionality

### Session Components

- `SessionProgress` - Visual session status and progress
- `SessionCreator` - Create new session form
- `SessionJoiner` - Join existing session form

### Movie Components

- `MovieSearch` - Search movies with debounced input
- `MovieCard` - Individual movie display
- `MovieList` - List of movies in session

### Shuffle Components

- `ShuffleButton` - Trigger random movie selection
- `ShuffleAnimation` - Selection animation
- `ResultsDisplay` - Show selected movie

## 🔧 Configuration

### API Configuration

The frontend connects to the backend API at `http://localhost:5000/api` by default. This can be configured in `src/services/api.js`.

### TMDB Integration

Movie posters and backdrops are loaded from TMDB's CDN. Placeholder images are shown when images fail to load.

## 📱 Responsive Design

The app is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎯 User Flow

1. **Home Page**: Create new session or join existing one
2. **Session Page**: Search and add movies, view session progress
3. **Results Page**: View selected movie and all session movies

## 🔄 Real-time Updates

The app uses polling every 3 seconds to provide real-time updates when other users add movies to the session.

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom color palette** with movie-themed colors
- **Glassmorphism effects** for modern UI
- **Smooth animations** and transitions
- **Dark theme** optimized for movie viewing

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables

Create a `.env` file for production configuration:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.
