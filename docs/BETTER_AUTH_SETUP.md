# Better Auth Setup Guide

This project uses [Better Auth](https://www.better-auth.com/) for authentication with Drizzle ORM and PostgreSQL.

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_SECRET=generate-a-random-secret-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Environment Variable Descriptions

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: A secret key (minimum 32 characters) for encrypting sessions and tokens. Generate a secure random string.
- `BETTER_AUTH_URL`: The base URL of your application (used server-side)
- `NEXT_PUBLIC_BETTER_AUTH_URL`: The base URL of your application (used client-side)

## Database Setup

### 1. Generate Migration

After setting up your environment variables, generate a migration for the Better Auth tables:

```bash
pnpm run db:generate
```

### 2. Push Schema to Database

Push the schema directly to your database:

```bash
pnpm run db:push
```

Or run migrations:

```bash
pnpm run db:migrate
```

## Database Schema

Better Auth requires the following tables (already configured in `src/db/schema/users.ts`):

- **user**: Stores user information (email, name, email verification status)
- **session**: Stores active user sessions
- **account**: Stores authentication provider accounts (for email/password and OAuth)
- **verification**: Stores email verification tokens

## Usage

### Server-Side

```typescript
import { auth } from '@/lib/auth';

// In API routes or server components
const session = await auth.api.getSession({
  headers: headers()
});
```

### Client-Side

```typescript
'use client';

import { signIn, signOut, signUp, useSession } from '@/lib/auth-client';

function AuthComponent() {
  const { data: session } = useSession();

  const handleSignUp = async () => {
    await signUp.email({
      email: 'your-email@example.com',
      password: 'your-secure-password',
      name: 'Your Name'
    });
  };

  const handleSignIn = async () => {
    await signIn.email({
      email: 'your-email@example.com',
      password: 'your-secure-password'
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {session ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}
    </div>
  );
}
```

## API Endpoints

Better Auth automatically creates the following API endpoints:

- `POST /api/auth/sign-up/email` - Sign up with email and password
- `POST /api/auth/sign-in/email` - Sign in with email and password
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- `POST /api/auth/verify-email` - Verify email
- And more...

## Database Management Scripts

- `pnpm run db:generate` - Generate migrations from schema changes
- `pnpm run db:migrate` - Run pending migrations
- `pnpm run db:push` - Push schema directly to database (dev mode)
- `pnpm run db:studio` - Open Drizzle Studio to view/edit data

## Security Notes

- Never commit your `.env` file or expose `BETTER_AUTH_SECRET`
- Use strong, randomly generated secrets in production
- Always use HTTPS in production for `BETTER_AUTH_URL`
- The `BETTER_AUTH_SECRET` should be at least 32 characters long

## Additional Configuration

You can customize Better Auth in `src/lib/auth.ts`:

- Add OAuth providers (Google, GitHub, etc.)
- Configure email verification
- Add two-factor authentication
- Customize session duration
- And more...

Refer to the [Better Auth documentation](https://www.better-auth.com/docs) for more options.
