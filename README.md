# OfferPath

A modern job application tracker built with Next.js, React, TypeScript, and Prisma.

## 1. Project Title

**OfferPath** is a production-oriented web application for tracking job applications end-to-end, from initial submission to final status.

## 2. Project Overview

OfferPath helps candidates organize their job search in one place.

The application solves a common workflow problem: job applications are often tracked across scattered notes, spreadsheets, and links, which makes progress hard to manage. OfferPath centralizes this process with structured records, search, sorting, status tracking, and favorites.

This project is intended for:

- Developers and other professionals actively applying for jobs
- Teams or individuals who want a clean, maintainable template for CRUD-heavy React applications
- Contributors interested in modern Next.js App Router architecture with typed API contracts

## 3. Features

- Google authentication via NextAuth
- Create, read, update, and delete job applications
- Per-user data isolation at the API and database query layer
- Search across multiple application fields
- Query normalization (trimmed, lowercased, collapsed whitespace)
- Debounced search input for smooth UX and fewer expensive recalculations
- Stable client-side sorting by created/updated dates
- Highlighted query matches in UI without `dangerouslySetInnerHTML`
- Form validation with Zod + React Hook Form
- Reusable UI primitives (inputs, dropdowns, buttons, modals, tooltips)
- Local cache for applications (per user) to improve perceived responsiveness

## 4. Technologies Used

### Frontend

- React 19
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

Why:

- Next.js App Router provides a clean structure for mixed server/client rendering.
- TypeScript improves reliability through strict contracts across components, API handlers, and utilities.
- Tailwind CSS enables consistent UI composition and fast iteration.

### State Management and Logic

- React Context API (`ApplicationsProvider`, modal/tooltip providers)
- React Hooks (`useMemo`, custom `useDebounce`, `useApplications`)

Why:

- Context + hooks keep shared state explicit and localized.
- `useMemo` and debouncing reduce unnecessary work during search/sort operations.

### Data and Auth

- Prisma ORM
- Neon Postgres via Prisma Neon adapter
- NextAuth (Google provider + Prisma adapter)

Why:

- Prisma gives strongly typed database access and migration workflow.
- Neon is well-suited for modern Postgres-backed cloud applications.
- NextAuth simplifies secure session-based authentication.

### Quality Tooling

- ESLint
- Prettier
- Vitest + Testing Library

Why:

- Enforces consistent code style and catches issues early.
- Supports maintainable development and safer refactoring.

## 5. Architecture

OfferPath follows a modular architecture with clear separation of concerns:

- `src/app`: route-level UI and API route handlers (App Router)
- `src/components`: reusable view components
- `src/contexts`: cross-cutting client state and actions
- `src/forms`: form UI + validation schemas
- `src/utils`: pure reusable utilities (search, sorting, normalization, helpers)
- `src/lib`: infrastructure bindings (auth, Prisma client)

Core technical decisions:

- Keep domain logic in utilities and forms, not in JSX-heavy component trees
- Use typed DTO transformations between API payloads and UI models
- Use memoized derivations for filtered/sorted lists
- Avoid HTML injection for highlighting by rendering safe React fragments/spans

### Component Structure

- Page components compose reusable blocks (`ApplicationCard`, `ApplicationSearchInput`, `ApplicationSortDropdown`)
- Common UI primitives are centralized under `src/components/common`
- Layout-level concerns stay in `src/components/layout`

### Separation of Concerns

- API routes handle authorization, validation, and persistence
- Context provider manages client-side list state/caching and exposes update actions
- Utility functions handle deterministic transformations (`searchApplications`, `sortApplications`, string normalization)

### Readability, Scalability, Performance

- Readability: strict typing, domain-oriented folders, predictable naming
- Scalability: modular utilities + provider pattern enable extension without large rewrites
- Performance: debounce + memoization + stable sorting + minimal recomputation of list output

## 6. Project Structure

```text
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/                  # App Router pages + API routes
│   │   ├── api/
│   │   │   ├── applications/ # CRUD endpoints
│   │   │   └── auth/         # NextAuth route
│   │   └── applications/     # Applications pages
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   ├── layout/           # Layout blocks (header, container, etc.)
│   │   ├── pages/            # Page-level presentational components
│   │   └── providers/        # Provider wrappers
│   ├── constants/            # Domain options and UI constants
│   ├── contexts/             # React contexts and hooks
│   ├── forms/                # Form logic and validation schemas
│   ├── hooks/                # Custom hooks (e.g. useDebounce)
│   ├── lib/                  # Prisma and auth setup
│   ├── tests/                # Component/unit tests
│   ├── types/                # Shared TypeScript contracts
│   └── utils/                # Search, sort, normalization, helpers
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 7. Search System

The search system is intentionally simple, fast, and predictable.

### Flow

1. User types in search input.
2. Input value is debounced (`useDebounce`) to avoid expensive updates on every key stroke.
3. Query is normalized (`trim + lowercase + whitespace collapse`).
4. Applications are filtered by checking normalized query against multiple searchable fields.
5. Result is memoized with `useMemo`.
6. Matching parts are highlighted in UI using range-based rendering.

### Search Utility Example

```ts
export function searchApplications(applications: IApplication[], query: string) {
   const normalizedQuery = normalizeString(query);

   if (!normalizedQuery) return applications;

   return applications.filter((application) =>
      SEARCHABLE_APPLICATION_FIELDS.some((field) =>
         normalizeString(String(application[field] ?? '')).includes(normalizedQuery),
      ),
   );
}
```

### Highlight Rendering (Safe)

Instead of string-based HTML injection, the app computes text ranges and renders React nodes:

```tsx
const matchRanges = getMatchRanges(text, query ?? '');
const parts: ReactNode[] = [];
let cursor = 0;

matchRanges.forEach((range, index) => {
   if (cursor < range.start) {
      parts.push(<Fragment key={`text-${index}`}>{text.slice(cursor, range.start)}</Fragment>);
   }

   parts.push(
      <span key={`match-${index}`} className="rounded bg-yellow-200">
         {text.slice(range.start, range.end)}
      </span>,
   );

   cursor = range.end;
});

if (cursor < text.length) {
   parts.push(<Fragment key="text-tail">{text.slice(cursor)}</Fragment>);
}

return <>{parts}</>;
```

This pattern avoids `dangerouslySetInnerHTML` and keeps rendering safe and composable.

## 8. Performance Optimization

Key performance techniques used in this project:

- Debounce in `useDebounce` to reduce rapid state churn from text input
- `useMemo` for filtered and sorted application lists
- Stable sorting to avoid unstable UI order when values are equal
- Local per-user cache in `ApplicationsProvider` for faster initial experience
- UI composition with focused, reusable components to limit unnecessary re-renders

## 9. Getting Started

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL-compatible database URL (Neon recommended)
- Google OAuth credentials (for sign-in)

### 1. Clone the repository

```bash
git clone <repo-url>
cd offer-path
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Google OAuth callback URL for local development:

```text
http://localhost:3000/api/auth/callback/google
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start development server

```bash
npm run dev
```

### 6. Open in browser

```text
http://localhost:3000
```

### Useful scripts

```bash
npm run dev         # Start local development server
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Lint source files
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
npm run format      # Format codebase with Prettier
```

## 10. Development Approach

This project is built around production-minded engineering principles:

- Clean code and explicit naming
- Modular architecture with well-defined responsibilities
- Reusable components and typed interfaces
- Separation of UI concerns from business/data logic
- Validation-first API handling with Zod
- Predictable, scalable search/sort architecture
- Incremental enhancements while preserving maintainability

In practice, this means new features should be added by composing existing patterns (types, constants, utilities, and provider actions) instead of introducing ad-hoc one-off logic.

## 11. Future Improvements

Potential next steps for scaling OfferPath:

- Server-side search for very large datasets
- Pagination or infinite scrolling
- Advanced filtering (status, salary range, stack, date windows)
- Analytics dashboard (application funnel, response rates)
- Export/import (CSV, JSON)
- Role-based collaboration features
- Improved observability (error tracking + metrics)
- Expanded authentication options and account settings

## Contribution Notes

Contributions are welcome.

Suggested workflow:

1. Create a feature branch.
2. Keep changes scoped and typed.
3. Run linting/tests before opening a pull request.
4. Document behavior changes in this README when architecture or workflows change.
