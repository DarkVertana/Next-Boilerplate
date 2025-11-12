# Next.js Authentication Boilerplate

A full-stack Next.js application with user authentication, protected routes, and a dashboard. Built with modern technologies including Prisma, NextAuth.js-inspired session management, and Tailwind CSS.

## Features

- **User Authentication**: Sign up and sign in functionality with secure password hashing
- **Protected Routes**: Middleware-based route protection for authenticated and unauthenticated users
- **Dashboard**: User dashboard with profile information and statistics
- **Database Integration**: Prisma ORM with SQLite database (easily configurable for other databases)
- **Responsive UI**: Modern, responsive design using Tailwind CSS
- **TypeScript**: Full TypeScript support for type safety
- **API Routes**: RESTful API endpoints for authentication

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Prisma with SQLite
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation with bcrypt and JWT-like cookies
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DarkVertana/Next-Boilerplate.git
cd Next-Boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── api/auth/
│   │   ├── signin/route.ts    # Sign in API endpoint
│   │   └── signup/route.ts    # Sign up API endpoint
│   ├── dashboard/
│   │   └── page.tsx           # Protected dashboard page
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── register/
│   │   └── page.tsx           # Registration page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── lib/
│   └── auth.ts                # Authentication utilities
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── middleware.ts              # Route protection middleware
└── README.md
```

## Authentication Flow

### Sign Up
1. User submits registration form
2. Password is hashed using bcrypt
3. User data is stored in database
4. User is redirected to login page

### Sign In
1. User submits login form
2. Credentials are validated against database
3. If valid, user data is encoded and set as HTTP-only cookie
4. User is redirected to dashboard

### Route Protection
- **Middleware**: Automatically protects routes based on authentication status
- **Dashboard (/dashboard)**: Requires authentication, redirects to /login if not authenticated
- **Auth Pages (/login, /register)**: Redirects to /dashboard if already authenticated

## API Endpoints

### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

### POST /api/auth/signin
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Sign in successful"
}
```

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
```

## Customization

### Changing Database
To use a different database (PostgreSQL, MySQL, etc.), update the `DATABASE_URL` in `.env` and modify `prisma/schema.prisma` accordingly.

### Styling
The application uses Tailwind CSS. Customize the design by modifying the classes in the component files or updating the `tailwind.config.js`.

### Authentication Logic
Extend the authentication logic in `lib/auth.ts` and the API routes in `app/api/auth/`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms
Ensure your deployment platform supports Node.js and can run the Prisma migrations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
