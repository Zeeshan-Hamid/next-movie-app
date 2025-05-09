# Movie House Web Application

A Next.js web application for browsing and managing movies, directors, and genres.

## Features

- Browse movies with filtering by genre
- View movie details and director information
- Browse directors and their filmographies
- Browse genres and associated movies
- Help center with FAQs
- Dark mode support using React Context API
- MongoDB integration for data storage
- API routes for server-side data operations

## Tech Stack

- **Frontend**: Next.js, React, SWR for data fetching
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **State Management**: React Context API for theme (dark mode)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- MongoDB account (using MongoDB Atlas in this project)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-house
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Seed the database with sample data:
```bash
npm run seed
# or
yarn seed
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

### Movies API
- `GET /api/movies` - Get all movies
- `GET /api/movies/[id]` - Get movie details by ID

### Genres API
- `GET /api/genres` - Get all genres
- `GET /api/genres/[id]/movies` - Get movies by genre ID

### Directors API
- `GET /api/directors` - Get all directors
- `GET /api/directors/[id]` - Get director details and their movies

## Dark Mode

The application includes a dark mode feature implemented using React Context API. Users can toggle between light and dark modes using the button in the header. The preference is saved in localStorage for persistence across sessions.

## Project Structure

- `/pages` - Next.js pages and API routes
- `/components` - React components
- `/contexts` - React Context providers
- `/styles` - CSS and CSS modules
- `/utils` - Utility functions
- `/data` - Sample data
- `/scripts` - Database scripts

## MongoDB Connection

The application connects to MongoDB Atlas using the connection string provided in the `utils/dbConnect.js` file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
