# Kickvora — Cricket & Basketball Strategy Platform

A free-to-use, skill-based sports strategy platform where users build teams from real players and compete on performance-based leaderboards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Database ORM | Prisma |
| Database | PostgreSQL |
| Auth | Custom — bcrypt + JWT + HTTP-only cookies |
| Deployment | Vercel (fully compatible) |

---

## Features

- **Custom authentication** — Email/password registration and login. No OAuth, no third-party providers. Passwords hashed with bcrypt (12 rounds). Sessions managed via signed JWT in HTTP-only cookies.
- **Match management** — Admin creates cricket and basketball matches with team names, venue, and scheduled date.
- **Player management** — Admin adds players to each match with roles. Points are updated after the match.
- **Team builder** — Users select players, assign a captain (2x points) and vice-captain (1.5x points).
- **Leaderboard** — Aggregated rankings by total points, filterable by sport.
- **Admin panel** — Full CRUD for matches, players, and user management. Role-based access control.
- **Static pages** — About, How It Works, Contact, Terms of Use, Privacy Policy.

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd kickvora
npm install --legacy-peer-deps
```

### 2. Set up environment variables

Copy the template and fill in your values:

```bash
cp env.template.txt .env
```

Required variables:

```
DATABASE_URL=postgresql://user:password@host:5432/kickvora
JWT_SECRET=your-random-secret-at-least-32-chars
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000.

---

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. Import the repository in Vercel (https://vercel.com).
3. Add the following environment variables in Vercel project settings:
   - DATABASE_URL — Your PostgreSQL connection string
   - JWT_SECRET — A strong random string (min 32 characters)
4. Vercel will automatically run `prisma generate && next build` on every deploy.

Recommended database providers for Vercel: Neon (https://neon.tech) or Supabase (https://supabase.com).

---

## Making a User an Admin

After registering, promote a user to admin by running this SQL query directly on your database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

Then log out and log back in. The admin panel is accessible at /admin.

---

## Project Structure

```
src/
  app/
    (auth)/         — Login and register pages
    (main)/         — All user-facing pages (Navbar + Footer layout)
    (admin)/        — Admin panel pages
    api/            — API routes (auth, matches, teams, leaderboard, admin)
    layout.tsx      — Root layout with metadata
    page.tsx        — Homepage
  components/
    layout/
      Navbar.tsx    — Top navigation bar
      Footer.tsx    — Site footer
  lib/
    auth.ts         — JWT session creation, verification, and cookie helpers
    prisma.ts       — Prisma client singleton
  middleware.ts     — Route protection middleware
prisma/
  schema.prisma     — Database schema
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| DATABASE_URL | Yes | PostgreSQL connection string |
| JWT_SECRET | Yes | Secret key for signing JWT session tokens |

---

## Contact

Support: support@kickvora.com
Address: G 93-94, D block, Baani Square, Sector 50, Gurugram, Haryana 122018, India
