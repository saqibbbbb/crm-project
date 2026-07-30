# CRM

A simple single-page CRM built with Next.js, React, and Tailwind CSS. It provides a login-gated dashboard for managing customers and sales orders, with light/dark theme support.

> **Note:** This project currently uses static mock data (no database) and hardcoded, client-side authentication. It is intended for local development / demo purposes only — see the [Security Notice](#security-notice) below before deploying it anywhere public.

## Features

- **Login screen** with client-side credential check
- **Dashboard** overview
- **Customers** — list and add customers
- **Sales Orders** — list and add sales orders
- **Light/Dark theme** toggle
- **Logout** / session handling via `localStorage`

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
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
npm run lint     # Run ESLint
```

## Login Credentials

Authentication is currently hardcoded in [`src/navigation.json`](./src/navigation.json) and checked client-side in [`src/Services/authService.ts`](./src/Services/authService.ts). Use one of the following to log in:

| Username | Password   |
|----------|------------|
| `saqib`  | `1234`     |
| `admin`  | `admin123` |

## Project Structure

```
src/
├── app/                     # Next.js App Router entry (layout.tsx, page.tsx)
├── App.tsx                  # App shell — handles auth state & view switching
├── Components/
│   ├── Auth/Login.tsx       # Login form
│   ├── Common/               # Icons, ThemeToggle
│   ├── Customer/              # CustomerForm, CustomerList
│   ├── Layout/ProtectedLayout.tsx  # Sidebar/header shown after login
│   └── SalesOrder/            # SalesOrderForm, SalesOrderList
├── Views/                   # Dashboard, Customers, SalesOrder page views
├── Services/                 # authService, customerService, salesOrderService
├── Utils/auth.ts             # localStorage token helpers
├── Helper/useTheme.ts        # Theme hook
├── data/                     # customers.json, salesOrders.json (static mock data)
├── navigation.json           # Hardcoded user credentials (see above)
└── types.ts                  # Shared TypeScript types
```

## Data

There is no backend/database. Customers and sales orders are read from static JSON files in `src/data/`, so changes made in the UI are not persisted between page reloads.

## Security Notice

This project is **not production-ready** as-is:

- Credentials are stored in plaintext in [`src/navigation.json`](./src/navigation.json) and shipped to the client.
- Login issues a hardcoded fake token (`"jwt.fake.token"`) instead of a real signed session/JWT.
- The `bcrypt` dependency is installed but unused — passwords are compared in plaintext.

Before using this beyond local development, you should move auth to a real backend, hash passwords, issue real signed tokens, and remove credentials from source control.

## License

Private project — not licensed for redistribution.
