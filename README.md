# CRM

A full-stack CRM built with Next.js, React, TypeScript, MongoDB, and Tailwind CSS. It provides a JWT-authenticated, role-based dashboard for managing customers and sales orders, with search, filtering, pagination, and revenue analytics.

## Features

- **Authentication** — bcrypt-hashed passwords, JWT sessions in httpOnly cookies
- **Role-based access control (RBAC)** — `admin` and `sales_rep` roles; deletes are admin-only
- **Dashboard** — revenue trend, order/customer status breakdowns, powered by MongoDB aggregation pipelines and Recharts
- **Customers** — search, status filter, pagination, create/edit/delete
- **Sales Orders** — search, status filter, pagination, create/edit/delete, referential-integrity check (a customer can't be deleted while orders reference it)
- **Server-side validation** — Zod schemas on every API route
- **Light/Dark theme** toggle
- **Logout** / cookie-based session handling

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Route Handlers)
- [React](https://react.dev/) 19
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://github.com/auth0/node-jsonwebtoken) (`jsonwebtoken`) + [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Zod](https://zod.dev/) for request validation
- [Recharts](https://recharts.org/) for dashboard analytics
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB instance — local (`brew install mongodb-community` on macOS) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### Installation

```bash
npm install
```

### Configure environment variables

Copy `.env.example` to `.env.local` and fill in your own values:

```bash
cp .env.example .env.local
```

```
MONGODB_URI=mongodb://127.0.0.1:27017/crm
JWT_SECRET=some-long-random-string
```

### Seed the database

Creates two users and 1,000 customers / 2,000 sales orders of realistic mock data:

```bash
npm run seed
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start the production server
npm run lint    # Run ESLint
npm run seed    # Seed MongoDB with users, customers, and sales orders
```

## Login Credentials

Seeded by `npm run seed` (passwords are bcrypt-hashed in the database, not stored in source):

| Username | Password   | Role        |
|----------|------------|-------------|
| `admin`  | `admin123` | `admin`     |
| `saqib`  | `1234`     | `sales_rep` |

Only `admin` can delete customers or sales orders; both roles can view, create, and edit.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/{login,logout,me}/route.ts     # JWT auth endpoints
│   │   ├── customers/route.ts                  # list (search/filter/paginate) + create
│   │   ├── customers/[id]/route.ts              # update, delete (admin-only)
│   │   ├── customers/options/route.ts           # lightweight lookup list for selects
│   │   ├── sales-orders/route.ts                # list (search/filter/paginate) + create
│   │   ├── sales-orders/[id]/route.ts           # update, delete (admin-only)
│   │   └── dashboard/route.ts                    # MongoDB aggregation stats
│   └── layout.tsx, page.tsx                      # Next.js App Router entry
├── App.tsx                        # App shell — session check & view switching
├── Context/AuthContext.tsx         # Logged-in user + role, available app-wide
├── lib/
│   ├── mongodb.ts                  # Cached Mongoose connection
│   ├── auth.ts                     # bcrypt hashing, JWT sign/verify, RBAC guard
│   └── validation.ts               # Zod schemas
├── models/                          # Mongoose schemas: User, Customer, SalesOrder
├── Components/
│   ├── Auth/Login.tsx
│   ├── Common/                     # Icons, ThemeToggle, Pagination, SearchFilterBar
│   ├── Customer/                    # CustomerForm, CustomerList
│   ├── Layout/ProtectedLayout.tsx   # Sidebar/header shown after login
│   └── SalesOrder/                  # SalesOrderForm, SalesOrderList
├── Views/                           # Dashboard, Customers, SalesOrder page views
├── Services/                        # authService, customerService, salesOrderService, dashboardService — fetch() wrappers around the API
├── Helper/useTheme.ts               # Theme hook
└── types.ts                         # Shared TypeScript types
scripts/
└── seed.ts                          # Seeds users, customers, and sales orders
```

## Data & Security

Auth uses signed JWTs stored in an httpOnly, sameSite cookie — never exposed to client-side JavaScript. Passwords are hashed with bcrypt before storage. Every API route validates its input with Zod and checks the caller's session (and role, where relevant) before touching the database.

## License

Private project — not licensed for redistribution.
